import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to BookBurst</h1>
        <p className="text-xl text-gray-600">
          Your personal reading companion for tracking books and sharing insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Track Your Reading</h2>
          <p className="text-gray-600 mb-4">
            Keep track of what you're reading, what you've finished, and what you want to read next.
          </p>
          {user ? (
            <Link
              to="/bookshelf"
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Go to Bookshelf
            </Link>
          ) : (
            <Link
              to="/register"
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Get Started
            </Link>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Share Your Journey</h2>
          <p className="text-gray-600 mb-4">
            Write reviews, rate books, and discover what others are reading.
          </p>
          <Link
            to="/explore"
            className="inline-block bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Explore Books
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Personal Bookshelf</h3>
            <p className="text-gray-600">
              Organize your books by reading status and track your progress
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Book Reviews</h3>
            <p className="text-gray-600">
              Share your thoughts and read reviews from other readers
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Reading History</h3>
            <p className="text-gray-600">
              Keep a timeline of your reading journey and achievements
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 