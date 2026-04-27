import React from "react";

const About = () => {
  return (
    <div>
      <div className="bg-teal-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About BharatYatra</h1>
          <p className="text-xl">Discovering the soul of India since 2015</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
  <div>
    <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h2>
    <p className="text-gray-600 mb-4">
      Born from a passion for India's incredible diversity, BharatYatra began with a simple mission: to make authentic Indian travel experiences accessible to everyone.
    </p>
    <p className="text-gray-600">
      Today, we've helped over 50,000 travelers explore the magic of India with comfort and authenticity.
    </p>
  </div>

  <div className="rounded-2xl overflow-hidden">
    <img
      src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop"
      alt="Team"
      className="w-full h-auto object-contain"
    />
  </div>
</div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: "fa-solid fa-users", value: "50K+", label: "Happy Travelers" },
            { icon: "fa-solid fa-trophy", value: "25+", label: "Awards Won" },
            { icon: "fa-solid fa-clock", value: "10+", label: "Years Experience" },
            { icon: "fa-solid fa-heart", value: "100+", label: "Destinations" },
          ].map((stat, idx) => (
            <div key={idx} className="p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl mb-3">
                <i className={`${stat.icon} text-teal-600`}></i>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
