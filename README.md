# @outslept/tsc-init

> Interactive TypeScript configuration generator with sensible defaults

`tsc-init` is a command-line tool designed to simplify TypeScript project configuration through an interactive interface. It guides you through key decisions to create an optimized `tsconfig.json` tailored to your specific project needs.

## Features

- **Interactive prompts** for intuitive configuration
- **Sensible defaults** based on modern TypeScript practices
- **Detailed explanations** to help you make informed decisions
- **Multiple environment targets** (Browser, Node.js, or Universal)
- **Project-specific configurations** for applications and libraries
- **Monorepo support** with composite project settings

## Installation

```bash
# Global installation
npm install -g @outslept/tsc-init

# Or run directly with npx
npx @outslept/tsc-init
```

## Usage

Run the command in your project directory:

```bash
tsc-init
```

The tool will guide you through a series of questions to generate an optimized `tsconfig.json` file.

### Command Line Options

```bash
Options:
  -h, --help               Show this help message
  -v, --verbose            Show detailed descriptions
  -o, --output <path>      Specify output file path (default: ./tsconfig.json)
  -f, --force              Overwrite existing configuration file
```

### Examples

```bash
# Basic usage
tsc-init

# With verbose descriptions
tsc-init --verbose

# Custom output location
tsc-init --output ./configs/tsconfig.json

# Force overwrite existing file
tsc-init --force
```

## Configuration Options

`tsc-init` will help you configure the following aspects of your TypeScript project:

### Transpilation Strategy

Choose between:

- **Transpile TypeScript to JavaScript**:
- Generates JavaScript output files
- **Type-check only**: No output files, only validates types

### Project Type

For transpiled projects, choose between:

- **Library/Package**: Generates declaration files (.d.ts)
- **Application**: Skip type definition generation

### Project Structure

For library projects, choose between:

- **Monorepo**: Enables project references with composite settings
- **Standalone**: Single package configuration

### Target Environment

Select your deployment target:

- **Browser**: Includes DOM and Web API type definitions
- **Node.js**: Server-side runtime types only
- **Universal**: Cross-platform support for both environments

## Configuration Variants

The tool generates different TypeScript configurations based on your project requirements. Below are examples of the various configuration profiles available:

### Application Configurations

_For a complete set of configuration examples, see the [examples directory](./examples)._

## License

MIT © [outslept](https://github.com/outslept)
