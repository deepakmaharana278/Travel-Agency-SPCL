import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelId, setCancelId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const bookingsList = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
      setBookings(bookingsList);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      await deleteDoc(doc(db, 'bookings', bookingId));
      await fetchBookings();
      setCancelId(null);
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Failed to cancel booking');
    }
  };

  const totalSpent = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const upcomingCount = bookings.filter(b => new Date(b.travelDate) >= new Date()).length;

  if (loading) {
    return (
      <div className="text-center py-20">
        <i className="fas fa-spinner fa-pulse text-4xl text-teal-600 mb-4"></i>
        <p className="text-gray-500">Loading your bookings from Firebase...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-2">
          <i className="fas fa-bookmark text-teal-600 text-3xl"></i>
          <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
        </div>
        <p className="text-gray-500 mb-8">View and manage all your travel bookings</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
            <i className="fas fa-calendar-check text-teal-600 text-2xl"></i>
            <div>
              <p className="text-gray-500 text-sm">Total Bookings</p>
              <p className="text-2xl font-bold text-teal-600">{bookings.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
            <i className="fas fa-plane-departure text-orange-500 text-2xl"></i>
            <div>
              <p className="text-gray-500 text-sm">Upcoming Trips</p>
              <p className="text-2xl font-bold text-orange-500">{upcomingCount}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
            <i className="fas fa-rupee-sign text-teal-600 text-2xl"></i>
            <div>
              <p className="text-gray-500 text-sm">Total Spent</p>
              <p className="text-2xl font-bold text-teal-600">₹{totalSpent.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <i className="fas fa-calendar-times text-6xl text-gray-400 mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">No Bookings Yet</h3>
            <p className="text-gray-500 mb-6">Make your first booking to see it here!</p>
            <button onClick={() => navigate('/packages')} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition">
              <i className="fas fa-search"></i> Browse Packages
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <i className="fas fa-ticket-alt text-teal-600"></i> {booking.packageName}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3 text-gray-600 text-sm">
                      <div className="flex items-center gap-2"><i className="fas fa-calendar-alt"></i> {new Date(booking.travelDate).toLocaleDateString()}</div>
                      <div className="flex items-center gap-2"><i className="fas fa-users"></i> {booking.travelers} travelers</div>
                      <div className="flex items-center gap-2"><i className="fas fa-rupee-sign"></i> ₹{booking.totalAmount?.toLocaleString()}</div>
                      <div className="flex items-center gap-2 text-green-600"><i className="fas fa-check-circle"></i> {booking.status || 'Confirmed'}</div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                      <i className="fas fa-phone-alt"></i> {booking.customerName} | {booking.customerPhone}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => navigate(`/package/${booking.packageId}`)} className="text-teal-600 border border-teal-600 px-3 py-1.5 rounded-lg text-sm hover:bg-teal-50 transition flex items-center gap-1">
                      <i className="fas fa-eye"></i> View Details
                    </button>
                    <button onClick={() => setCancelId(booking.id)} className="text-red-600 border border-red-600 px-3 py-1.5 rounded-lg text-sm hover:bg-red-50 transition flex items-center gap-1">
                      <i className="fas fa-trash-alt"></i> Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cancelId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="text-center mb-4">
              <i className="fas fa-exclamation-triangle text-red-500 text-5xl mb-3"></i>
              <h3 className="text-xl font-bold">Cancel Booking?</h3>
            </div>
            <p className="text-gray-600 mb-6 text-center">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setCancelId(null)} className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2">
                <i className="fas fa-arrow-left"></i> Keep
              </button>
              <button onClick={() => handleCancel(cancelId)} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition flex items-center justify-center gap-2">
                <i className="fas fa-trash-alt"></i> Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;