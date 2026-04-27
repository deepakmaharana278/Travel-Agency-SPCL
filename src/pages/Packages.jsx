import React from 'react';
import { useNavigate } from 'react-router-dom';
import packagesData from '../data/packagesData.json';



const Packages = () => {
  const navigate = useNavigate();
  const { packages } = packagesData;

  return (
    <div>
      <div className="bg-teal-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">India Tour Packages</h1>
          <p className="text-lg">Curated experiences for every traveler, every budget</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map(pkg => (
            <div key={pkg.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
              <img src={pkg.image} alt={pkg.name} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{pkg.name}</h3>
                <div className="space-y-2 mb-4 text-gray-600">
                  <div className="flex items-center gap-2"><i className="fa-solid fa-clock"></i> {pkg.durationShort}</div>
                  <div className="flex items-center gap-2"><i className="fa-solid fa-user-group"></i> {pkg.group}</div>
                  <div className="flex items-center gap-2"><i className="fa-solid fa-calendar-days"></i> Flexible departure</div>
                </div>
                <ul className="mb-4 space-y-1">
                  {pkg.features.slice(0, 3).map((f, i) => <li key={i} className="text-sm text-gray-500">✓ {f}</li>)}
                </ul>
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <div><span className="text-sm text-gray-500">Starting from</span><div className="text-2xl font-bold text-teal-600">₹{pkg.price.toLocaleString()}</div></div>
                  <button onClick={() => navigate(`/package/${pkg.id}`)} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-5 rounded-lg transition">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;