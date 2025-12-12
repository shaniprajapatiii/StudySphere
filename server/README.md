# Study Sphere - Server Overview

## Project Description

**Study Sphere Server** is a robust Node.js/Express backend that powers the Study Sphere learning platform. It handles user authentication, playlist management, video content delivery, AI-powered features, and learning analytics while integrating seamlessly with MongoDB for data persistence.

## Key Features

### 🔐 Authentication & Security
- **Google OAuth 2.0 Integration**: Secure authentication via Google accounts
- **Session Management**: Express sessions with MongoDB store for persistent user sessions
- **Passport.js**: Industry-standard authentication middleware
- **CORS Protection**: Cross-origin resource sharing with configurable origins
- **Secure Cookies**: HTTP-only, secure cookies with appropriate SameSite policies
- **Password Security**: Bcrypt hashing for sensitive data

### 📚 Content Management
- **Playlist Management**: Create, update, and manage learning playlists
- **Feed System**: Curated video feed with filtering and discovery
- **Video Player Controls**: Transcript fetching and video metadata management
- **YouTube Integration**: Fetch and process YouTube video content

### 🤖 AI-Powered Features
- **Google Generative AI Integration**: Powered by Google's Gemini API
- **Smart Learning Summaries**: AI-generated summaries of video content
- **Interactive Quizzes**: AI-generated quiz questions for videos
- **Personalized Recommendations**: AI-based content suggestions

### 👤 User Management
- **User Profiles**: Complete user profile management
- **Learning Analytics**: Track user progress and learning history
- **Personalization**: User preferences and learning paths

## Tech Stack

### Backend Framework
- **Node.js**: JavaScript runtime
- **Express.js (v5.1.0)**: Fast, minimal web framework
- **Nodemon**: Development auto-restart on file changes

### Database
- **MongoDB**: NoSQL document database
- **Mongoose**: MongoDB object modeling
- **connect-mongo**: MongoDB session store

### Authentication & Authorization
- **Passport.js**: Authentication middleware
- **passport-google-oauth20**: Google OAuth strategy
- **express-session**: Session management

### External APIs & Services
- **Google Generative AI**: AI-powered features (Gemini)
- **YouTube Data**: Content from YouTube
- **@distube/ytdl-core**: YouTube video downloading
- **youtube-transcript**: Extract video transcripts

### Utilities
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **node-fetch**: HTTP client for API calls

## Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── passport.js              # Passport authentication strategy
│   │
│   ├── middleware/
│   │   └── authMiddleware.js        # Authentication verification middleware
│   │
│   ├── models/
│   │   ├── User.js                  # User schema & model
│   │   └── playlist.js              # Playlist schema & model
│   │
│   ├── routes/
│   │   ├── auth.js                  # Authentication routes (login/signup)
│   │   ├── playlist.js              # Playlist CRUD operations
│   │   ├── feed.js                  # Video feed & discovery
│   │   ├── aiRoutes.js              # AI-powered features
│   │   ├── userRoutes.js            # User profile management
│   │   └── playerControl/
│   │       └── transcript.js        # Video transcript routes
│   │
│   ├── services/
│   │   ├── transcriptService.js     # Transcript extraction logic
│   │   └── youtubeService.js        # YouTube API integration
│   │
│   └── utils/
│       ├── connectDB.js             # MongoDB connection
│       ├── runPython.js             # Python script execution
│       └── youtubeService.js        # YouTube utilities
│
├── scripts/
│   ├── fetch_transcript.py          # Python script for transcript fetching
│   ├── test_invidious.js            # Invidious API testing
│   └── test_dynamic_invidious.js    # Dynamic Invidious testing
│
├── server.js                        # Main application entry point
├── package.json                     # Dependencies & scripts
└── README.md                        # This file
```

## API Routes

### Authentication Routes (`/auth`)
- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `GET /auth/logout` - User logout
- `GET /auth/google` - Google OAuth initiation
- `GET /auth/google/callback` - Google OAuth callback

### Playlist Routes (`/api/playlists`)
- `GET /api/playlists` - Get user's playlists
- `POST /api/playlists` - Create new playlist
- `GET /api/playlists/:id` - Get playlist details
- `PUT /api/playlists/:id` - Update playlist
- `DELETE /api/playlists/:id` - Delete playlist
- `POST /api/playlists/:id/videos` - Add video to playlist
- `DELETE /api/playlists/:id/videos/:videoId` - Remove video

### Feed Routes (`/api/feed`)
- `GET /api/feed` - Get video feed
- `GET /api/feed?category=...` - Filter by category
- `GET /api/feed?search=...` - Search videos

### Video Player Routes (`/api/videos`)
- `GET /api/videos/:id/transcript` - Fetch video transcript
- `GET /api/videos/:id/metadata` - Get video metadata

### AI Routes (`/api/ai`)
- `POST /api/ai/summary` - Generate video summary
- `POST /api/ai/quiz` - Generate quiz questions
- `POST /api/ai/recommendations` - Get recommendations

### User Routes (`/api/user`)
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `GET /api/user/progress` - Get learning progress
- `GET /api/user/history` - Get learning history

## Database Models

### User Model
```javascript
{
  _id: ObjectId,
  googleId: String,           // Google OAuth ID
  email: String,
  name: String,
  profilePicture: String,
  preferences: Object,
  createdAt: Date,
  updatedAt: Date
}
```

### Playlist Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId,           // Reference to User
  title: String,
  description: String,
  videos: [ObjectId],         // Array of video references
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables

Create a `.env` file in the server directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/studysphere

# Session
SESSION_SECRET=your-secret-key

# Client URL
CLIENT_URL=http://localhost:5173

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# AI Services
GOOGLE_API_KEY=your-google-api-key

# YouTube
YOUTUBE_API_KEY=your-youtube-api-key
```

## Getting Started

### Installation
```bash
cd server
npm install
```

### Development
```bash
npm start  # Runs with nodemon for auto-restart
```

The server will start on the port specified in `.env` (default: 5000)

### Health Check
```bash
curl http://localhost:5000/health
```

## Key Middleware

### CORS Middleware
- Allows requests from configured frontend URL
- Supports credentials for cookie-based authentication

### Session Middleware
- MongoDB-backed session store
- 7-day session expiration
- Secure cookies in production

### Passport Middleware
- Initializes Passport authentication
- Maintains user sessions

### Custom Authentication Middleware
- Protects routes requiring authentication
- Validates user identity from session

## External Integrations

### Google OAuth
- User authentication and registration
- Secure token management
- Profile synchronization

### Google Generative AI (Gemini)
- Video content summarization
- Quiz generation
- Personalized recommendations
- Content analysis

### YouTube Integration
- Video metadata extraction
- Transcript retrieval
- Video recommendations
- Content discovery

## Security Features

✅ **CORS Protection**: Only allowed origins can access the API
✅ **Session Security**: MongoDB-backed sessions with secure cookies
✅ **HTTP-Only Cookies**: Prevents XSS attacks
✅ **Secure Cookies in Production**: HTTPS-only transmission
✅ **SameSite Policy**: CSRF protection with Lax policy
✅ **Passport Authentication**: Industry-standard auth framework
✅ **Environment Variables**: Sensitive data stored securely

## Performance Considerations

- **MongoDB Indexing**: Optimized queries on user IDs and playlists
- **Session Store**: Persistent sessions without server memory overhead
- **API Caching**: Content caching strategies for frequent requests
- **Async Operations**: Non-blocking I/O for all database operations

## Error Handling

- Comprehensive error messages
- Proper HTTP status codes
- Validation for all inputs
- Graceful fallbacks for external API failures

## Scalability

- **Stateless Design**: Supports horizontal scaling
- **MongoDB Clustering**: Supports replica sets
- **Session Persistence**: Independent of server instances
- **Load Balancing**: Compatible with reverse proxies

## Future Enhancements

- Rate limiting for API protection
- Webhook integrations
- Advanced analytics and reporting
- Video recommendation engine improvements
- Real-time notifications
- Social features (comments, discussions)
- Offline sync capabilities

## Troubleshooting

### MongoDB Connection Issues
- Verify `MONGO_URI` in `.env`
- Check network connectivity
- Ensure IP whitelist in MongoDB Atlas

### Google OAuth Not Working
- Verify OAuth credentials in `.env`
- Check redirect URI configuration in Google Console
- Ensure `CLIENT_URL` matches OAuth configuration

### CORS Errors
- Verify frontend URL in `CLIENT_URL` environment variable
- Check that frontend is making requests with credentials

### Session Issues
- Clear MongoDB sessions collection
- Check cookie settings in browser dev tools
- Verify `SESSION_SECRET` is set

---

**Study Sphere Server** provides a comprehensive, scalable backend for modern e-learning with AI-powered features, secure authentication, and robust content management.
