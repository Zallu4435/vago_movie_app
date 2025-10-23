# Movie Search & Favorites App

A full-stack application for searching movies and managing favorites, built with TypeScript, React, Express, and clean architecture principles.

## Project Structure

```
movie_app/
├── backend/          # Express.js API with clean architecture
├── frontend/         # React application with TypeScript
└── README.md
```

## Backend

### Architecture
- **Domain Layer**: Entities, Value Objects, Domain Errors
- **Application Layer**: Use Cases, DTOs, Mappers, Ports
- **Infrastructure Layer**: Controllers, Repositories, External APIs
- **Main Layer**: Application setup and server configuration

### Key Features
- Movie search using OMDB API
- Favorites management (add/remove/toggle)
- Clean architecture with dependency injection
- Comprehensive error handling
- Input validation with Zod
- Circuit breaker pattern for external API calls

### Testing
The backend includes comprehensive tests:
- Unit tests for use cases, controllers, and services
- Integration tests for API endpoints
- Domain entity and value object tests
- External API adapter tests

#### Running Backend Tests
```bash
cd backend
npm install
npm test                 # Run tests once
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage
npm run test:ci         # Run tests for CI/CD
```

## Frontend

### Architecture
- **Components**: Reusable UI components with TypeScript
- **Hooks**: Custom React hooks for state management
- **Services**: API communication layer
- **Context**: Global state management
- **Utils**: Helper functions and utilities

### Key Features
- Movie search with debounced input
- Favorites management with optimistic updates
- Responsive design with Tailwind CSS
- Error handling and loading states
- Toast notifications
- TypeScript for type safety

### Testing
The frontend includes comprehensive tests:
- Component tests with React Testing Library
- Hook tests with custom render functions
- Service/API tests with mocked dependencies
- Utility function tests
- Integration tests for user workflows

#### Running Frontend Tests
```bash
cd frontend
npm install
npm test                 # Run tests once
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage
npm run test:ui         # Run tests with UI
npm run test:ci         # Run tests for CI/CD
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Testing Strategy

### Backend Testing
- **Unit Tests**: Test individual use cases, controllers, and services in isolation
- **Integration Tests**: Test API endpoints with real HTTP requests
- **Domain Tests**: Test business logic and domain rules
- **Coverage**: Minimum 70% coverage for branches, functions, lines, and statements

### Frontend Testing
- **Component Tests**: Test component rendering, props, and user interactions
- **Hook Tests**: Test custom hooks with mocked dependencies
- **Service Tests**: Test API communication with mocked HTTP requests
- **Utility Tests**: Test helper functions and utilities
- **Integration Tests**: Test complete user workflows

## Test Commands Summary

### Backend (Jest)
```bash
npm test                 # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # With coverage report
npm run test:ci         # CI mode with coverage
```

### Frontend (Vitest)
```bash
npm test                 # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # With coverage report
npm run test:ui         # Visual test runner
npm run test:ci         # CI mode with coverage
```

## Development

### Code Quality
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type checking
- Comprehensive test coverage

### Best Practices
- Clean architecture principles
- Dependency injection
- Error handling and validation
- Comprehensive testing
- Type safety with TypeScript
- Responsive design
- Accessibility considerations

## Contributing

1. Write tests for new features
2. Ensure all tests pass
3. Maintain code coverage above 70%
4. Follow clean architecture principles
5. Use TypeScript for type safety
6. Write meaningful commit messages
