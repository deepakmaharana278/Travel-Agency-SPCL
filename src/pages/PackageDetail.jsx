import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { packages } from '../data/packagesData.json';

const PackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    travelDate: '', 
    travelers: 2, 
    specialRequests: '' 
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState('');

  const packageData = packages.find(p => String(p.id) === String(id));

  if (!packageData) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Package not found</h2>
        <button onClick={() => navigate('/packages')} className="bg-orange-500 text-white px-6 py-2 rounded-lg mt-4">Go Back</button>
      </div>
    );
  }

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleProceed = () => {
    if (!bookingData.name.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!bookingData.email.trim()) {
      setError('Please enter your email');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(bookingData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!bookingData.phone.trim()) {
      setError('Please enter your phone number');
      return;
    }
    if (!/^\d{10}$/.test(bookingData.phone)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    if (!bookingData.travelDate) {
      setError('Please select a travel date');
      return;
    }
    setBookingStep(2);
    setError('');
  };

  const handleConfirmBooking = async () => {
    setLoading(true);
    setError('');
    
    try {
      const bookingRef = collection(db, 'bookings');
      
      const bookingDetails = {
        packageId: packageData.id,
        packageName: packageData.name,
        price: packageData.price,
        totalAmount: packageData.price * parseInt(bookingData.travelers),
        customerName: bookingData.name.trim(),
        customerEmail: bookingData.email.trim(),
        customerPhone: bookingData.phone.trim(),
        travelDate: bookingData.travelDate,
        travelers: parseInt(bookingData.travelers),
        specialRequests: bookingData.specialRequests?.trim() || '',
        status: 'Confirmed',
        createdAt: new Date().toISOString(),
        bookingDate: serverTimestamp()
      };

      await addDoc(bookingRef, bookingDetails);
      
      setBookingSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setBookingStep(1);
        setBookingSuccess(false);
        setBookingData({ 
          name: '', 
          email: '', 
          phone: '', 
          travelDate: '', 
          travelers: 2, 
          specialRequests: '' 
        });
        navigate('/my-bookings');
      }, 2000);
    } catch (err) {
      console.error('Firebase Error:', err);
      setError(`Booking failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <button onClick={() => navigate('/packages')} className="text-teal-600 mb-6 inline-flex items-center gap-2 hover:text-teal-700">
          <i className="fas fa-arrow-left"></i> Back to Packages
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <img src={packageData.image} alt={packageData.name} className="w-full h-96 object-cover rounded-2xl shadow-lg" />
            <div className="bg-white rounded-2xl p-6 mt-6 shadow-sm">
              <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                <h1 className="text-3xl font-bold text-gray-800">{packageData.name}</h1>
                <div className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-lg">
                  <i className="fas fa-star text-yellow-500"></i> {packageData.rating} 
                  <span className="text-gray-500 text-sm ml-1">({packageData.reviews} reviews)</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 pb-4 border-b text-gray-600">
                <div className="flex items-center gap-2"><i className="far fa-clock"></i> {packageData.duration}</div>
                <div className="flex items-center gap-2"><i className="fas fa-users"></i> {packageData.group}</div>
                <div className="flex items-center gap-2"><i className="fas fa-map-marker-alt"></i> {packageData.region} India</div>
              </div>
              <div className="py-4">
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2"><i className="fas fa-info-circle text-teal-600"></i> About the Tour</h2>
                <p className="text-gray-600 leading-relaxed">{packageData.description}</p>
              </div>
              <div className="py-4">
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2"><i className="fas fa-list-ul text-teal-600"></i> Itinerary</h2>
                <ul className="space-y-2">
                  {packageData.itinerary.map((item, idx) => (
                    <li key={idx} className="text-gray-600 flex items-start gap-2">
                      <i className="fas fa-thumbtack text-teal-600 mt-1"></i> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid md:grid-cols-2 gap-6 py-4">
                <div className="bg-green-50 p-4 rounded-xl">
                  <h3 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                    <i className="fas fa-check-circle"></i> Inclusions
                  </h3>
                  <ul className="space-y-1">
                    {packageData.inclusions.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                        <i className="fas fa-check text-green-500 text-xs"></i> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-xl">
                  <h3 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                    <i className="fas fa-times-circle"></i> Exclusions
                  </h3>
                  <ul className="space-y-1">
                    {packageData.exclusions.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                        <i className="fas fa-times text-red-500 text-xs"></i> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="mb-4 pb-4 border-b">
                <div className="text-3xl font-bold text-teal-600">
                  ₹{packageData.price.toLocaleString()}
                  <span className="text-sm text-gray-500 ml-1">/person</span>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600"><i className="far fa-clock"></i> Duration</span>
                  <span className="font-semibold">{packageData.duration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600"><i className="fas fa-users"></i> Group Size</span>
                  <span className="font-semibold">{packageData.group}</span>
                </div>
              </div>
              <button 
                onClick={() => setShowModal(true)} 
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl w-full transition flex items-center justify-center gap-2"
              >
                <i className="fas fa-bookmark"></i> Book Now
              </button>
              <div className="mt-4 pt-4 border-t space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2"><i className="fas fa-phone-alt"></i> Need help? Call +91 8984056080</div>
                <div className="flex items-center gap-2"><i className="fas fa-envelope"></i> hello@bharatyatra.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <i className="fas fa-ticket-alt text-teal-600"></i> Book {packageData.name}
              </h2>
              <button 
                onClick={() => { setShowModal(false); setBookingStep(1); setError(''); }} 
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            {bookingSuccess ? (
              <div className="p-8 text-center">
                <div className="text-6xl mb-4 text-green-500"><i className="fas fa-check-circle"></i></div>
                <h3 className="text-xl font-semibold mb-2">Booking Confirmed!</h3>
                <p className="text-gray-600">Your booking has been saved to Firebase.</p>
                <p className="text-gray-500 text-sm mt-2"><i className="fas fa-spinner fa-pulse"></i> Redirecting to My Bookings...</p>
              </div>
            ) : bookingStep === 1 ? (
              <div className="p-4 space-y-4">
                {error && (
                  <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm border border-red-200 flex items-center gap-2">
                    <i className="fas fa-exclamation-triangle"></i> {error}
                  </div>
                )}
                <div className="relative">
                  <i className="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Full Name *" 
                    value={bookingData.name} 
                    onChange={handleChange} 
                    className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="relative">
                  <i className="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Email *" 
                    value={bookingData.email} 
                    onChange={handleChange} 
                    className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="relative">
                  <i className="fas fa-phone absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input 
                    type="tel" 
                    name="phone" 
                    placeholder="Phone (10 digits) *" 
                    value={bookingData.phone} 
                    onChange={handleChange} 
                    className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="relative">
                  <i className="fas fa-calendar-alt absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input 
                    type="date" 
                    name="travelDate" 
                    value={bookingData.travelDate} 
                    onChange={handleChange} 
                    className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="relative">
                  <i className="fas fa-user-friends absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input 
                    type="number" 
                    name="travelers" 
                    value={bookingData.travelers} 
                    onChange={handleChange} 
                    min="1" 
                    max="20" 
                    className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="relative">
                  <i className="fas fa-comment absolute left-3 top-3 text-gray-400"></i>
                  <textarea 
                    name="specialRequests" 
                    placeholder="Special Requests (Optional)" 
                    value={bookingData.specialRequests} 
                    onChange={handleChange} 
                    rows="2" 
                    className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  ></textarea>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold"><i className="fas fa-rupee-sign"></i> Total Amount</span>
                    <span className="font-bold text-teal-600 text-lg">
                      ₹{(packageData.price * bookingData.travelers).toLocaleString()}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={handleProceed} 
                  className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg w-full font-semibold transition flex items-center justify-center gap-2"
                >
                  <i className="fas fa-arrow-right"></i> Proceed to Payment
                </button>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {error && (
                  <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm flex items-center gap-2">
                    <i className="fas fa-exclamation-triangle"></i> {error}
                  </div>
                )}
                <div className="bg-teal-50 p-4 rounded-xl text-center">
                  <h3 className="font-bold mb-2 flex items-center justify-center gap-2">
                    <i className="fas fa-receipt"></i> Booking Summary
                  </h3>
                  <p><strong><i className="fas fa-map"></i> Package:</strong> {packageData.name}</p>
                  <p><strong><i className="fas fa-users"></i> Travelers:</strong> {bookingData.travelers}</p>
                  <p><strong><i className="fas fa-calendar"></i> Travel Date:</strong> {bookingData.travelDate}</p>
                  <div className="text-2xl font-bold text-teal-600 mt-2">
                    <i className="fas fa-rupee-sign"></i> {(packageData.price * bookingData.travelers).toLocaleString()}
                  </div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg flex items-center gap-2">
                  <i className="fas fa-info-circle text-yellow-600"></i>
                  <p className="text-sm text-yellow-700">Demo Payment: Click Confirm to save booking to Firebase.</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setBookingStep(1)} 
                    className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-chevron-left"></i> Back
                  </button>
                  <button 
                    onClick={handleConfirmBooking} 
                    disabled={loading} 
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? <><i className="fas fa-spinner fa-pulse"></i> Saving...</> : <><i className="fas fa-check"></i> Confirm Booking</>}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageDetail;