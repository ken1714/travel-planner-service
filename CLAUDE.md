# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication Language

**IMPORTANT**: All communication in this project should be conducted in Japanese. This includes comments, commit messages, documentation, and conversations with users.

## Project Overview

This is a NestJS-based travel planner service built with TypeScript. It's currently a starter application with basic controller/service structure running on Node.js.

## Development Commands

### Building and Running
- `npm run build` - Build the application
- `npm run start` - Start in production mode
- `npm run start:dev` - Start in development mode with watch
- `npm run start:debug` - Start with debugging enabled

### Code Quality
- `npm run lint` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier

### Testing
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:debug` - Run tests in debug mode

## Architecture

### Core Structure
- **Framework**: NestJS with Express platform
- **Language**: TypeScript with decorators enabled
- **Port**: Application runs on port 3000
- **Entry Point**: `src/main.ts` bootstraps the NestJS application
- **Root Module**: `src/app.module.ts` contains the main application module

### Current Implementation
- Basic controller/service pattern established in `AppController` and `AppService`
- Uses NestJS dependency injection with `@Injectable()` and constructor injection
- Standard NestJS decorators: `@Controller()`, `@Get()`, etc.

### Testing Setup
- Unit tests with Jest (`.spec.ts` files in src/)
- E2E tests with Supertest in `test/` directory
- Coverage reports generated in `coverage/` directory
- Tests run from `src/` as root directory

### TypeScript Configuration
- Target: ES2021
- Module: CommonJS
- Decorators and metadata emission enabled
- Source maps enabled for debugging
- Build output in `dist/` directory

## Coding Standards

**IMPORTANT**: All development must follow the coding standards defined in `docs/coding-standards.md`. Key requirements include:

### Architecture Principles
- Follow Layered Architecture with clear separation of concerns
- Apply Domain-Driven Design (DDD) principles
- Place all business rules in the Domain layer
- Maintain proper dependency directions between layers

### Code Style
- Use camelCase for variables and functions
- Use UpperCamelCase (PascalCase) for classes, interfaces, and types
- Use UPPER_SNAKE_CASE for constants
- Follow naming conventions that clearly express intent

### Testing Strategy
- Prioritize API tests to cover complete use cases
- Follow classical testing approach (avoid excessive mocking)
- Write unit tests only for complex domain logic
- Ensure all business scenarios are covered through end-to-end testing

### Development Workflow
- Follow the GitHub Issue workflow documented in `docs/github-issue-workflow.md`
- Use commit message format: `[feat]`, `[fix]`, `[docs]`, `[refactor]`, `[test]`, `[chore]`
- Create branches from latest main: `feature/issue-{number}-{description}`
- Always run `npm run lint`, `npm run build`, `npm run test`, and `npm run test:e2e` before creating pull requests

### Code Quality Requirements
- Implement proper error handling with domain-specific exceptions
- Use structured logging with appropriate log levels
- Write meaningful comments for business logic and complex algorithms
- Follow import ordering conventions
- Avoid magic numbers and hardcoded values

### Pull Request Requirements
- Use PR template format defined in `.github/PULL_REQUEST_TEMPLATE.md`
- Include Issue number in PR title: `[#123] Feature description`
- Always link related Issue using `Closes #123` in PR description
- Complete all checklist items in PR template before requesting review
- Run and pass all quality checks: lint, build, unit tests, and E2E tests
- Provide clear test results in PR description
- Mark PR as `[WIP]` or draft during development, remove when ready for review