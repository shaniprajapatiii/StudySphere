# Study Sphere - Frontend Overview

## Project Description

**Study Sphere** is an interactive online learning platform frontend built with modern web technologies. It provides users with a personalized video-based learning experience, playlist management, and comprehensive progress tracking through an intuitive dashboard.

## Key Features

### 📚 Core Features
- **Video Feed**: Discover and explore educational content with intelligent filtering and recommendations
- **Video Player**: Integrated video player with transcript display, quiz integration, and learning summaries
- **Playlist Management**: Create, organize, and manage learning playlists
- **User Dashboard**: Track progress, view learning statistics, and access quiz history
- **Authentication**: Secure user authentication with session management
- **User Profile**: Personalized user profile with learning preferences
- **Responsive Design**: Mobile-friendly interface that works across all devices

### 📊 Learning Analytics
- **Activity Charts**: Visual representation of learning activity over time
- **Statistics Cards**: Quick overview of key metrics (videos watched, quizzes taken, etc.)
- **Quiz History**: Track completed quizzes and performance metrics
- **Progress Tracking**: Monitor learning progress across different courses/playlists

### 🎓 Educational Tools
- **Interactive Video Player**: 
  - Video playback controls
  - Embedded transcripts
  - Quiz integration
  - Learning summaries
- **Quiz Integration**: Take quizzes directly within video content
- **Playlist Support**: Organize videos into learning paths

## Tech Stack

### Frontend Framework & Tools
- **React**: Modern UI component library
- **Vite**: Fast build tool and development server
- **ESLint**: Code quality and linting
- **CSS / TailwindCSS**: Custom styling with design system constants

### Libraries & Dependencies
- **Context API**: State management for authentication and global state
- **Custom Hooks**: `useAuth` for authentication management
- **React Router**: Navigation and page routing (inferred from page structure)

### Design System
- **Centralized Design Constants**: `src/constants/designSystem.js` for consistent theming
- **Component-Based Architecture**: Modular reusable components


## Key Pages & Components

### Dashboard (`pages/Dashboard/`)
- **Purpose**: Central hub for learning progress and statistics
- **Components**:
  - `StatsCards.jsx`: Display key learning metrics
  - `ActivityChart.jsx`: Visualize learning activity trends
  - `QuizHistory.jsx`: Show completed quizzes and scores

### Feed (`pages/Feed/`)
- **Purpose**: Discover and browse educational videos
- **Components**:
  - `VideoCard.jsx`: Individual video preview
  - `PlaylistCard.jsx`: Playlist previews
  - `FilterBar.jsx`: Filter and search videos
  - `LoadingSpinner.jsx`: Loading indicators
  - `ErrorMessage.jsx`: Error handling UI

### Video Player (`pages/VideoPlayer/`)
- **Purpose**: Interactive video learning experience
- **Components**:
  - `Player.jsx`: Main player component
  - `VideoFrame.jsx`: Video embed
  - `VideoControls.jsx`: Playback controls
  - `TranscriptBox.jsx`: Video transcript display
  - `QuizBox.jsx`: Quiz integration
  - `SummaryBox.jsx`: Learning summary
  - `Predisplay.jsx`: Pre-video content

### Playlist Management (`pages/Playlist/`)
- **Purpose**: Create and manage learning collections
- **Components**:
  - `Playlist.jsx`: Main playlist page
  - `PlaylistList.jsx`: List view of playlists
  - `PlaylistDetails.jsx`: Individual playlist details
  - `PlaylistView.jsx`: Playlist video viewer
  - `VideoItem.jsx`: Video in playlist
  - `VideoPlayer.jsx`: Playlist video player
  - `AddPlaylistForm.jsx`: Create new playlists

### Authentication
- **Context**: `AuthContext.jsx` manages user authentication state
- **Hook**: `useAuth.js` provides authentication utilities
- **Middleware**: Integrated with backend passport authentication

## Getting Started

### Installation
```bash
cd frontend
npm install  # Uses legacy-peer-deps=true for compatibility
```

### Development
```bash
npm run dev  # Start Vite dev server
```

### Build
```bash
npm run build  # Production build
```

### Linting
```bash
npm run lint  # Run ESLint
```

## Configuration Files

- **vite.config.js**: Vite bundler configuration
- **eslint.config.js**: Code quality rules
- **.npmrc**: npm configuration with legacy peer deps support
- **package.json**: Dependencies and scripts
- **index.html**: HTML entry point

## API Integration

The frontend connects to the backend server for:
- **Authentication**: User login/signup
- **Content**: Video feed, playlists, user data
- **Features**: Transcripts, quizzes, analytics
- **Services**: YouTube integration for video sources

## UI/UX Highlights

- **Loading States**: Skeleton loaders for smooth content loading
- **Error Handling**: Graceful error messages and recovery
- **Responsive Design**: Mobile, tablet, and desktop support
- **Accessibility**: Semantic HTML and ARIA labels
- **Navigation**: Auto-scroll to top, breadcrumb navigation
- **User Experience**: Dropdown menus, intuitive filtering

## Design Principles

- **Consistency**: Centralized design system
- **Modularity**: Reusable components
- **Performance**: Code splitting and lazy loading
- **Accessibility**: WCAG compliance
- **Mobile-First**: Responsive and touch-friendly

## Performance Optimizations

- **Vite**: Ultra-fast development and build process
- **Skeleton Loaders**: Perceived performance improvements
- **Asset Optimization**: Optimized images in public/assets
- **Code Splitting**: Component-based architecture enables tree-shaking

## Future Enhancements

Potential areas for expansion:
- Advanced search and recommendations
- Offline viewing capabilities
- Social features (comments, discussions)
- Adaptive learning paths
- Mobile app (React Native)
- Real-time notifications

---

**Study Sphere Frontend** is designed to provide an engaging, user-friendly learning experience with robust features for progress tracking and educational content discovery.
