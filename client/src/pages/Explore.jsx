import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Explore() {
  const [activeTab, setActiveTab] = useState('trending');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedTab = localStorage.getItem('exploreTab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('exploreTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response;
        switch (activeTab) {
          case 'trending':
            response = await axios.get('http://localhost:5000/api/books/trending');
            break;
          case 'reviews':
            response = await axios.get('http://localhost:5000/api/reviews/recent');
            break;
          default:
            response = await axios.get('http://localhost:5000/api/books/trending');
        }
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Explore</h1>
      
      <div className="flex space-x-4 mb-6">
        {['trending', 'reviews'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === 'trending' ? (
          data.map(book => (
            <div key={book._id} className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold">{book._id}</h3>
              <p className="text-gray-600">Added by {book.count} users</p>
            </div>
          ))
        ) : (
          data.map(review => (
            <div key={review._id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center mb-2">
                <span className="font-semibold">{review.user.name}</span>
                <span className="mx-2">•</span>
                <span className="text-gray-600">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{review.book.title}</h3>
              <p className="text-gray-600 mb-2">{review.content}</p>
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="ml-1">{review.rating}/5</span>
                {review.wouldRecommend && (
                  <span className="ml-2 text-green-500">✓ Recommended</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 