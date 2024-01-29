# Quake Log Parser Service

## Description

This application parses and analyzes Quake game server logs. It extracts key game information such as player statistics, match outcomes, and deaths categorized by cause. The goal is to provide a comprehensive overview of game play events from Quake server logs.

## Technologies

- [NestJS](https://nestjs.com/)
- [pnpm](https://pnpm.io/)

## Prerequisites

Before you can run the Quake Log Parser Service, ensure you have the following software installed on your system:

1. **Node.js**: The runtime environment for running the application. You need Node.js version 12.x or later. You can download it from [Node.js official website](https://nodejs.org/).

2. **pnpm**: A fast and efficient package manager for JavaScript. It is used to manage the application's dependencies. Install pnpm globally using the following command:

```bash
npm install -g pnpm
```

3. **NestJS CLI**: The command-line interface tool that helps you to initialize, develop, and maintain your NestJS applications. It can be installed globally using pnpm:

```bash
pnpm install -g @nestjs/cli
```

After installing these prerequisites, you can proceed with the installation and running of the Quake Log Parser Service as described in the previous sections of the README.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/lucasaf/quake-log-parser-service.git
```

2. Navigate to the project directory:

```bash
cd quake-log-parser-service
```

3. Install dependencies using pnpm:

```bash
pnpm install
```

## Running the Application

- **Development Mode**:

```bash
pnpm run start:dev
```

- **Production Mode**:

```bash
pnpm run start
```

## Example File

Example output files can be found at `src/assets/outputs/*.json`.

## Running Tests

To execute the unit tests, run:

```bash
pnpm test
```

## Author

- [Lucas Alves Ferreira](https://github.com/lucasaf)

## License

Nest is [MIT licensed](LICENSE).
