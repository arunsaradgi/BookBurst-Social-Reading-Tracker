import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Bookshelf() {
  const [books, setBooks] = useState([]);
  const [activeTab, setActiveTab] = useState('reading');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const savedTab = localStorage.getItem('bookshelfTab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bookshelfTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        setBooks(response.data);
      } catch (err) {
        setError('Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book => book.status === activeTab);

  const handleStatusChange = async (bookId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/books/${bookId}`, {
        status: newStatus
      });
      setBooks(books.map(book =>
        book._id === bookId ? { ...book, status: newStatus } : book
      ));
    } catch (err) {
      setError('Failed to update book status');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Bookshelf</h1>
      
      <div className="flex space-x-4 mb-6">
        {['reading', 'finished', 'want_to_read'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {tab.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map(book => (
          <div key={book._id} className="bg-white rounded-lg shadow p-4">
            {book.coverImage && (
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-gray-600">{book.author}</p>
            <div className="mt-4">
              <select
                value={book.status}
                onChange={(e) => handleStatusChange(book._id, e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="reading">Reading</option>
                <option value="finished">Finished</option>
                <option value="want_to_read">Want to Read</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 