# Quake Log Parser Service

## Description

This application parses and analyzes Quake game server logs. It extracts key game information such as player statistics, match outcomes, and deaths categorized by cause. The goal is to provide a comprehensive overview of game play events from Quake server logs.

## Technologies

- [NestJS](https://nestjs.com/):
- [pnpm](https://pnpm.io/):

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
