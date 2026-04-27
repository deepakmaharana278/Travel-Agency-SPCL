import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import destinationsData from "../data/destinationsData.json";

const Destinations = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterRegion, setFilterRegion] = useState("All");
  const { destinations } = destinationsData;

  const filtered = destinations.filter((dest) => dest.name.toLowerCase().includes(search.toLowerCase()) && (filterRegion === "All" || dest.region === filterRegion));

  const regions = ["All", "North", "South", "East", "West"];

  return (
    <div>
      <div className="bg-linear-to-r from-teal-700 to-teal-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Explore Indian Destinations</h1>
          <p className="text-lg">From Kashmir to Kanyakumari - Find your perfect getaway</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><i className="fas fa-search"></i></span>
            <input
              type="text"
              placeholder="Search destinations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setFilterRegion(region)}
                className={`px-4 py-2 rounded-lg transition ${filterRegion === region ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((dest) => (
            <div key={dest.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
              <img src={dest.image} alt={dest.name} className="w-full h-56 object-cover" />
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1 text-gray-500">
                    <span className="text-sm"><i className="fas fa-location-dot"></i></span> <span className="text-sm">{dest.region} India</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <span><i className="fas fa-calendar-days"></i></span> <span>{dest.duration}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{dest.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{dest.description.substring(0, 80)}...</p>
                <div className="flex justify-between items-center mt-3 pt-3 border-t">
                  <div>
                    <span className="text-xs text-gray-400">Starting from</span>
                    <div className="text-lg font-bold text-teal-600">
                      ₹{dest.price.toLocaleString()}
                      <span className="text-xs text-gray-400">/person</span>
                    </div>
                  </div>
                  <button onClick={() => navigate(`/destination/${dest.id}`)} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm py-2 px-4 rounded-lg transition">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && <p className="text-center text-gray-500 py-12">No destinations found.</p>}
      </div>
    </div>
  );
};

export default Destinations;
