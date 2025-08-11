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