#!/usr/bin/env node

import { existsSync, writeFileSync } from 'node:fs'
import process from 'node:process'
import { confirm, isCancel, select, spinner, text } from '@clack/prompts'
import * as pathe from 'pathe'
import pc from 'picocolors'

interface CompilerOptions {
  esModuleInterop: boolean
  skipLibCheck: boolean
  target: 'es2022'
  allowJs: boolean
  resolveJsonModule: boolean
  moduleDetection: 'force'
  isolatedModules: boolean
  verbatimModuleSyntax: boolean
  strict: boolean
  noUncheckedIndexedAccess: boolean
  noImplicitOverride: boolean
  module?: 'NodeNext' | 'preserve'
  outDir?: string
  sourceMap?: boolean
  declaration?: boolean
  composite?: boolean
  declarationMap?: boolean
  noEmit?: boolean
  lib?: string[]
}

// Parse arguments in POSIX-compliant way
const args = process.argv.slice(2)
let isVerbose = false
let showHelp = false
let outputPath = ''
let forceOverwrite = false

// Process arguments
for (let i = 0; i < args.length; i++) {
  const arg = args[i]
  if (arg === '--verbose' || arg === '-v') {
    isVerbose = true
  }
  else if (arg === '--help' || arg === '-h') {
    showHelp = true
  }
  else if (arg === '--output' || arg === '-o') {
    if (i + 1 < args.length) {
      outputPath = args[++i]
    }
  }
  else if (arg === '--force' || arg === '-f') {
    forceOverwrite = true
  }
}

const HELP_MESSAGE = `
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
`

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
    dom: {
      short: 'Browser',
      verbose: 'Browser-only (DOM + Web APIs)',
    },
    node: {
      short: 'Node.js',
      verbose: 'Node.js runtime (Server-side)',
    },
    both: {
      short: 'Universal',
      verbose: 'Cross-platform (Browser + Node.js)',
    },
  },
}

function handleExit() {
  process.stdout.write(pc.dim('\n\nOperation cancelled. Exiting...\n'))
  process.exit(0)
}

// Catch signals for graceful exit
process.on('SIGINT', handleExit)
process.on('SIGTERM', handleExit)
process.on('SIGHUP', handleExit)

function printSuccess(path: string): void {
  const relativePath = pathe.relative(process.cwd(), path)
  const displayPath = relativePath.startsWith('..') ? path : `./${relativePath}`

  process.stdout.write('\n')
  process.stdout.write(`${pc.green('✓')} Created ${pc.bold(displayPath)}\n`)
  process.stdout.write('\n')
  process.stdout.write(pc.dim('Next steps:\n'))
  process.stdout.write('\n')
  process.stdout.write(pc.dim('  1. Review the generated configuration\n'))
  process.stdout.write(pc.dim(`     ${pc.cyan('cat')} ${displayPath}\n`))
  process.stdout.write('\n')
  process.stdout.write(pc.dim('  2. Install dependencies (if needed)\n'))
  process.stdout.write(
    pc.dim(`     ${pc.cyan('npm')} install typescript @types/node --save-dev\n`),
  )
  process.stdout.write('\n')
}

async function main(): Promise<void> {
  if (showHelp) {
    process.stdout.write(HELP_MESSAGE)
    process.exit(0)
  }

  // Get output path if not provided via command line
  if (!outputPath) {
    const customPath = await text({
      message: 'Where to save the config file?',
      placeholder: './tsconfig.json',
      initialValue: './tsconfig.json',
      validate(value) {
        if (!value)
          return 'Path is required'
        if (value.trim() === '')
          return 'Path cannot be empty'
      },
    })

    if (isCancel(customPath))
      handleExit()

    outputPath = customPath as string
  }

  // Normalize path (handles ./, ../, etc.)
  const normalizedPath = pathe.normalize(outputPath)

  // Resolve to absolute path
  const absolutePath = pathe.resolve(process.cwd(), normalizedPath)

  // Create directory if needed
  const dirPath = pathe.dirname(absolutePath)
  if (!existsSync(dirPath)) {
    const shouldCreateDir = await confirm({
      message: `Directory ${pc.bold(pathe.relative(process.cwd(), dirPath))} doesn't exist. Create it?`,
    })

    if (isCancel(shouldCreateDir) || !shouldCreateDir)
      handleExit()

    try {
      // Using recursive mkdir
      import('node:fs/promises').then(({ mkdir }) => {
        mkdir(dirPath, { recursive: true })
      })
    }
    catch (error) {
      process.stderr.write(
        pc.red(`\n✗ Failed to create directory: ${(error as Error).message}\n`),
      )
      process.exit(1)
    }
  }

  // Check if file exists
  if (existsSync(absolutePath) && !forceOverwrite) {
    const relativePath = pathe.relative(process.cwd(), absolutePath)
    const displayPath = relativePath.startsWith('..') ? absolutePath : `./${relativePath}`

    const shouldOverwrite = await confirm({
      message: `${pc.yellow('!')} File ${pc.bold(displayPath)} already exists. Overwrite?`,
    })

    if (isCancel(shouldOverwrite) || !shouldOverwrite)
      handleExit()
  }

  const compilerOptions: CompilerOptions = {
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
    noImplicitOverride: true,
  }

  const isTranspilingWithTS = await confirm({
    message: isVerbose
      ? DESCRIPTIONS.transpiling.verbose
      : DESCRIPTIONS.transpiling.short,
  })

  if (isCancel(isTranspilingWithTS))
    handleExit()

  if (isTranspilingWithTS) {
    compilerOptions.module = 'NodeNext'
    compilerOptions.outDir = 'dist'
    compilerOptions.sourceMap = true

    const isBuildingLibrary = await confirm({
      message: isVerbose
        ? DESCRIPTIONS.library.verbose
        : DESCRIPTIONS.library.short,
    })

    if (isCancel(isBuildingLibrary))
      handleExit()

    if (isBuildingLibrary) {
      compilerOptions.declaration = true

      const isMonorepo = await confirm({
        message: isVerbose
          ? DESCRIPTIONS.monorepo.verbose
          : DESCRIPTIONS.monorepo.short,
      })

      if (isCancel(isMonorepo))
        handleExit()

      if (isMonorepo) {
        compilerOptions.composite = true
        compilerOptions.declarationMap = true
      }
    }
  }
  else {
    compilerOptions.module = 'preserve'
    compilerOptions.noEmit = true
  }

  const environment = await select({
    message: `${pc.dim('Target environment:')}`,
    options: [
      {
        value: 'dom',
        label: isVerbose
          ? DESCRIPTIONS.environment.dom.verbose
          : DESCRIPTIONS.environment.dom.short,
        hint: isVerbose ? undefined : pc.dim('DOM + Web APIs'),
      },
      {
        value: 'node',
        label: isVerbose
          ? DESCRIPTIONS.environment.node.verbose
          : DESCRIPTIONS.environment.node.short,
        hint: isVerbose ? undefined : pc.dim('Server-side runtime'),
      },
      {
        value: 'both',
        label: isVerbose
          ? DESCRIPTIONS.environment.both.verbose
          : DESCRIPTIONS.environment.both.short,
        hint: isVerbose ? undefined : pc.dim('Browser + Node.js'),
      },
    ],
  })

  if (isCancel(environment))
    handleExit()

  compilerOptions.lib
    = environment === 'dom'
      ? ['es2022', 'dom', 'dom.iterable']
      : environment === 'both'
        ? ['es2022', 'dom', 'dom.iterable']
        : ['es2022']

  const tsconfig = {
    $schema: 'https://json.schemastore.org/tsconfig',
    compilerOptions,
    include: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    exclude: ['node_modules', 'dist'],
  }

  // Show progress spinner while generating
  const s = spinner()
  s.start('Generating TypeScript configuration')

  try {
    // Small delay to show spinner (would be replaced by actual work in a real scenario)
    await new Promise(resolve => setTimeout(resolve, 800))

    writeFileSync(absolutePath, JSON.stringify(tsconfig, null, 2))
    s.stop('Configuration generated')
    printSuccess(absolutePath)
  }
  catch (error) {
    s.stop('Failed to generate configuration')
    process.stderr.write(
      pc.red(`\n✗ Failed to write configuration file: ${(error as Error).message}\n`),
    )
    process.exit(1)
  }
}

main().catch((error) => {
  process.stderr.write(pc.red(`\n✗ ${error.message}\n`))
  process.exit(1)
})
