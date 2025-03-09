#!/usr/bin/env node

import { existsSync, writeFileSync } from 'node:fs'
import process from 'node:process'
import { confirm, isCancel, select, spinner, text } from '@clack/prompts'
import * as pathe from 'pathe'
import pc from 'picocolors'

const args = process.argv.slice(2)
let isVerbose = false, outputPath = '', forceOverwrite = false

for (let i = 0; i < args.length; i++) {
  const arg = args[i]
  if (arg === '--verbose' || arg === '-v') isVerbose = true
  else if (arg === '--help' || arg === '-h') {
    process.stdout.write(`
${pc.bold('@outslept/tsc-init')} - Interactive TypeScript configuration generator

${pc.dim('Usage:')}
  npx @outslept/tsc-init [options]

${pc.dim('Options:')}
  -h, --help               Show this help message
  -v, --verbose            Show detailed descriptions
  -o, --output <path>      Specify output file path (default: ./tsconfig.json)
  -f, --force              Overwrite existing configuration file

${pc.dim('Examples:')}
  npx @outslept/tsc-init
  npx @outslept/tsc-init --verbose
  npx @outslept/tsc-init --output ./configs/tsconfig.json
  npx @outslept/tsc-init --force
`)
    process.exit(0)
  }
  else if ((arg === '--output' || arg === '-o') && i + 1 < args.length) outputPath = args[++i]
  else if (arg === '--force' || arg === '-f') forceOverwrite = true
}

const DESCRIPTIONS = {
  transpiling: {
    short: 'Transpile TypeScript to JavaScript?',
    verbose: `${pc.dim('Choose compilation strategy:')}

    ${pc.green('✓')} YES - Compile TS → JS (${pc.dim('Generates JavaScript files')})
    ${pc.red('✗')} NO  - Type-check only (${pc.dim('No output files')})`,
  },
  library: {
    short: 'Building a library package?',
    verbose: `${pc.dim('Select project type:')}

    ${pc.green('✓')} YES - Library/Package (${pc.dim('Generates .d.ts files')})
    ${pc.red('✗')} NO  - Application (${pc.dim('Skip type definitions')})`,
  },
  monorepo: {
    short: 'Part of a monorepo?',
    verbose: `${pc.dim('Project structure:')}

    ${pc.green('✓')} YES - Monorepo (${pc.dim('Enables project references')})
    ${pc.red('✗')} NO  - Standalone (${pc.dim('Single package setup')})`,
  },
  environment: {
    dom: { short: 'Browser', verbose: 'Browser-only (DOM + Web APIs)' },
    node: { short: 'Node.js', verbose: 'Node.js runtime (Server-side)' },
    both: { short: 'Universal', verbose: 'Cross-platform (Browser + Node.js)' },
  },
}

const handleExit = (): never => {
  process.stdout.write(pc.dim('\n\nOperation cancelled. Exiting...\n'))
  process.exit(0)
}

['SIGINT', 'SIGTERM', 'SIGHUP'].forEach(signal => process.on(signal, handleExit))

async function getOutputPath(initialPath: string): Promise<string> {
  if (initialPath) return initialPath

  const customPath = await text({
    message: 'Where to save the config file?',
    placeholder: './tsconfig.json',
    initialValue: './tsconfig.json',
    validate: value => {
      if (!value) return 'Path is required'
      if (value.trim() === '') return 'Path cannot be empty'
      return undefined
    }
  })

  if (isCancel(customPath)) handleExit()
  return customPath as string
}

async function ensureDirectoryExists(filePath: string): Promise<void> {
  const dirPath = pathe.dirname(filePath)
  if (existsSync(dirPath)) return

  const shouldCreate = await confirm({
    message: `Directory ${pc.bold(pathe.relative(process.cwd(), dirPath))} doesn't exist. Create it?`
  })

  if (isCancel(shouldCreate) || !shouldCreate) handleExit()

  try {
    const { mkdir } = await import('node:fs/promises')
    await mkdir(dirPath, { recursive: true })
  } catch (error) {
    process.stderr.write(pc.red(`\n✗ Failed to create directory: ${(error as Error).message}\n`))
    process.exit(1)
  }
}

async function checkFileOverwrite(filePath: string, force: boolean): Promise<void> {
  if (!existsSync(filePath) || force) return

  const relativePath = pathe.relative(process.cwd(), filePath)
  const displayPath = relativePath.startsWith('..') ? filePath : `./${relativePath}`

  const shouldOverwrite = await confirm({
    message: `${pc.yellow('!')} File ${pc.bold(displayPath)} already exists. Overwrite?`
  })

  if (isCancel(shouldOverwrite) || !shouldOverwrite) handleExit()
}

function buildBaseCompilerOptions(): Record<string, unknown> {
  return {
    esModuleInterop: true,
    skipLibCheck: true,
    target: 'es2022',
    allowJs: true,
    resolveJsonModule: true,
    moduleDetection: 'force',
    isolatedModules: true,
    verbatimModuleSyntax: true,
    strict: true,
    noUncheckedIndexedAccess: true,
    noImplicitOverride: true
  }
}

async function configureLibrary(options: Record<string, unknown>): Promise<void> {
  const isLibrary = await confirm({
    message: isVerbose ? DESCRIPTIONS.library.verbose : DESCRIPTIONS.library.short
  })

  if (isCancel(isLibrary)) handleExit()
  if (!isLibrary) return

  options.declaration = true

  const isMonorepo = await confirm({
    message: isVerbose ? DESCRIPTIONS.monorepo.verbose : DESCRIPTIONS.monorepo.short
  })

  if (isCancel(isMonorepo)) handleExit()
  if (!isMonorepo) return

  options.composite = true
  options.declarationMap = true
}

async function configureTranspilation(options: Record<string, unknown>): Promise<void> {
  const isTranspiling = await confirm({
    message: isVerbose ? DESCRIPTIONS.transpiling.verbose : DESCRIPTIONS.transpiling.short
  })

  if (isCancel(isTranspiling)) handleExit()

  if (isTranspiling) {
    Object.assign(options, {
      module: 'NodeNext',
      outDir: 'dist',
      sourceMap: true
    })

    await configureLibrary(options)
  } else {
    options.module = 'preserve'
    options.noEmit = true
  }
}

function getEnvironmentHint(env: string): string {
  switch (env) {
    case 'dom':
      return 'DOM + Web APIs'
    case 'node':
      return 'Server-side runtime'
    default:
      return 'Browser + Node.js'
  }
}

async function configureEnvironment(options: Record<string, unknown>): Promise<void> {
  const envOptions = Object.entries(DESCRIPTIONS.environment).map(([value, { short, verbose }]) => ({
    value,
    label: isVerbose ? verbose : short,
    hint: isVerbose ? undefined : pc.dim(getEnvironmentHint(value))
  }))

  const environment = await select({
    message: `${pc.dim('Target environment:')}`,
    options: envOptions
  })

  if (isCancel(environment)) handleExit()

  options.lib = environment === 'node'
    ? ['es2022']
    : ['es2022', 'dom', 'dom.iterable']
}

function printSuccess(path: string): void {
  const relativePath = pathe.relative(process.cwd(), path)
  const displayPath = relativePath.startsWith('..') ? path : `./${relativePath}`

  process.stdout.write(`
${pc.green('✓')} Created ${pc.bold(displayPath)}

${pc.dim('Next steps:')}
  ${pc.dim(`1. Review the configuration: ${pc.cyan('cat')} ${displayPath}`)}
  ${pc.dim(`2. Install dependencies: ${pc.cyan('npm')} install typescript @types/node --save-dev`)}
`)
}

async function writeConfigFile(filePath: string, compilerOptions: Record<string, unknown>): Promise<void> {
  const tsconfig = {
    $schema: 'https://json.schemastore.org/tsconfig',
    compilerOptions,
    include: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    exclude: ['node_modules', 'dist'],
  }

  const s = spinner()
  s.start('Generating TypeScript configuration')

  try {
    await new Promise(resolve => setTimeout(resolve, 800))
    writeFileSync(filePath, JSON.stringify(tsconfig, null, 2))
    s.stop('Configuration generated')

    printSuccess(filePath)
  } catch (error) {
    s.stop('Failed to generate configuration')
    process.stderr.write(pc.red(`\n✗ Failed to write configuration file: ${(error as Error).message}\n`))
    process.exit(1)
  }
}

async function main(): Promise<void> {
  outputPath = await getOutputPath(outputPath)
  const absolutePath = pathe.resolve(process.cwd(), pathe.normalize(outputPath))

  await ensureDirectoryExists(absolutePath)

  await checkFileOverwrite(absolutePath, forceOverwrite)

  const compilerOptions = buildBaseCompilerOptions()
  await configureTranspilation(compilerOptions)
  await configureEnvironment(compilerOptions)

  await writeConfigFile(absolutePath, compilerOptions)
}

main().catch(error => {
  process.stderr.write(pc.red(`\n✗ ${error.message}\n`))
  process.exit(1)
})
