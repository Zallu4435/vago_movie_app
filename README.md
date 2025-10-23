# 🎬 Movie Search & Favorites App

A full-stack TypeScript application for searching movies and managing favorites, built with React, Express, and clean architecture principles.

## ✨ Features

- 🔍 **Movie Search** - Search movies using the OMDB API with debounced input
- ❤️ **Favorites Management** - Add/remove movies from favorites with heart icon
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- ⚡ **Real-time Updates** - Optimistic updates for smooth user experience
- 🛡️ **Type Safety** - Full TypeScript implementation
- 🧪 **Comprehensive Testing** - Unit and integration tests
- 🏗️ **Clean Architecture** - Domain-driven design with dependency injection

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd movie_app
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env  # Add your OMDB API key
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 🏗️ Architecture

### Backend (Express + TypeScript)
```
backend/
├── src/
│   ├── domain/           # Business logic & entities
│   ├── application/      # Use cases & DTOs
│   ├── infrastructure/   # Controllers & repositories
│   └── main/            # App setup
```

### Frontend (React + TypeScript)
```
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── services/        # API communication
│   ├── context/         # Global state management
│   └── pages/           # Page components
```

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/movies/search?q={query}&page={page}` | Search movies |
| `GET` | `/api/favorites` | Get user favorites |
| `POST` | `/api/favorites/toggle` | Toggle favorite status |
| `GET` | `/api/favorites/check/:imdbID` | Check if movie is favorited |
| `DELETE` | `/api/favorites/all` | Remove all favorites |

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test                 # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # With coverage
```

### Frontend Tests
```bash
cd frontend
npm test                 # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # With coverage
```

## 🛠️ Development

### Code Quality
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **Jest/Vitest** - Testing framework

### Key Technologies
- **Backend**: Express.js, TypeScript, Jest
- **Frontend**: React, TypeScript, Vite, Vitest
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **API**: OMDB API integration

## 📦 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
OMDB_API_KEY=your_omdb_api_key_here
SESSION_SECRET=your_session_secret
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SEARCH_DEBOUNCE_DELAY=1000
```

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
npm run build
npm start
```

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy dist/ folder to your hosting service
```

## 📋 Requirements Met

✅ **MERN Stack** - Express.js, React, Node.js with in-memory storage  
✅ **Debounced Search** - 1000ms delay to prevent excessive API calls  
✅ **Movie Search** - OMDB API integration with proper error handling  
✅ **Favorites Management** - Add/remove movies with session-based storage  
✅ **Clean UI** - Responsive design with Tailwind CSS  
✅ **Error Handling** - Comprehensive error handling and validation  
✅ **Testing** - Unit and integration tests with good coverage  

## 🎯 Bonus Features

- 🏗️ **Clean Architecture** - Domain-driven design with dependency injection
- ⚡ **Performance** - Circuit breaker pattern and optimistic updates
- 🧪 **Testing** - Comprehensive test coverage (70%+)
- 🎨 **UI/UX** - Modern, responsive design with loading states
- 🔒 **Type Safety** - Full TypeScript implementation
- 📱 **Responsive** - Mobile-first design approach

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OMDB API](https://www.omdbapi.com/) for movie data
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React](https://reactjs.org/) and [Express.js](https://expressjs.com/) frameworks
