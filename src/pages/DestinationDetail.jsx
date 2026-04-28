import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import destinationsData from '../data/destinationsData.json';

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { destinations } = destinationsData;
  const destination = destinations.find(d => d.id === parseInt(id));

  if (!destination) {
    return <div className="text-center py-20"><h2 className="text-2xl font-bold">Destination not found</h2><button onClick={() => navigate('/destinations')} className="bg-orange-500 text-white px-6 py-2 rounded-lg mt-4">Go Back</button></div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <button onClick={() => navigate('/destinations')} className="text-teal-600 mb-6 inline-flex items-center gap-2">← Back to Destinations</button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <img src={destination.image} alt={destination.name} className="w-full h-96 object-cover rounded-2xl" />
            <div className="bg-white rounded-2xl p-6 mt-6">
              <h1 className="text-3xl font-bold mb-2">{destination.name}</h1>
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <div className="flex items-center gap-1 text-yellow-500"><i className="fa-solid fa-star"></i> {destination.rating}</div>
                <div className="flex items-center gap-1 text-gray-500"><span><i className='fas fa-location-dot'></i></span> {destination.region} India</div>
                <div className="flex items-center gap-1 text-gray-500"><span><i className="fa-solid fa-calendar-days"></i></span> Best: {destination.bestTime}</div>
              </div>
              <p className="text-gray-600 leading-relaxed">{destination.description}</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Highlights</h3>
              <ul className="grid grid-cols-2 gap-2">
                {destination.highlights.map((h, i) => <li key={i} className="text-gray-600">✓ {h}</li>)}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="mb-4 pb-4 border-b">
                <div className="text-3xl font-bold text-teal-600">₹{destination.price.toLocaleString()}<span className="text-sm text-gray-500">/person</span></div>
                <p className="text-sm text-gray-500 mt-1">Package starting price</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between"><span className="text-gray-600">Duration</span><span className="font-semibold">{destination.duration}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Best Time</span><span className="font-semibold">{destination.bestTime}</span></div>
              </div>
              <button onClick={() => navigate(`/package/${destination.packageId}`)} className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white font-semibold py-3 px-6 rounded-xl w-full">Book Now</button>
              <div className="mt-4 pt-4 border-t space-y-2 text-sm text-gray-500">
                <div><i className='fas fa-phone'></i> Need help? Call +91 98765 43210</div>
                <div><i className='fas fa-envelope'></i> hello@bharatyatra.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;