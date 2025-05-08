# BookBurst - Social Reading Tracker

BookBurst is a personal reading log and social discovery platform where users can track their reading activity, log reviews, and explore community trends.

## Features

- Personal bookshelf management
- Reading status tracking
- Book reviews and ratings
- Community book discovery
- Public profile pages
- Reading history timeline

## Tech Stack

### Backend
- Node.js with Express
- MongoDB
- JWT Authentication

### Frontend
- React with Vite
- Tailwind CSS
- React Router
- Axios

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bookburst.git
cd bookburst
```

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Install frontend dependencies:
```bash
cd ../client
npm install
```

4. Create a `.env` file in the server directory:
```
MONGODB_URI=mongodb://localhost:27017/bookburst
JWT_SECRET=your-secret-key
PORT=5000
```

5. Start the backend server:
```bash
cd server
npm run dev
```

6. Start the frontend development server:
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Usage

1. Register a new account or login with existing credentials
2. Add books to your bookshelf
3. Track your reading progress
4. Write reviews and rate books
5. Explore books and reviews from other users
6. View your reading history and achievements

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.