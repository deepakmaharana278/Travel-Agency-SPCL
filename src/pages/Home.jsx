import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  { id: 1, image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&h=600&fit=crop", title: "Incredible India", subtitle: "Discover the land of diversity" },
  { id: 2, image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1600&h=600&fit=crop", title: "Himalayan Adventures", subtitle: "Experience the majesty of mountains" },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1564362494483-9d7d4437361b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29sZGVuJTIwYmVhY2h8ZW58MHx8MHx8fDA%3D",
    title: "Golden Beaches",
    subtitle: "Sun, sand, and memories",
  },
];

const testimonials = [
  { id: 1, name: "Priya Sharma", location: "Mumbai", text: "Amazing experience! Kerala trip was magical.", rating: 5, image: "https://randomuser.me/api/portraits/women/1.jpg" },
  { id: 2, name: "Rajiv Mehta", location: "Delhi", text: "Golden Triangle tour was perfectly organized!", rating: 5, image: "https://randomuser.me/api/portraits/men/2.jpg" },
  { id: 3, name: "Anjali Nair", location: "Bangalore", text: "Goa beach vacation was exactly what we needed!", rating: 5, image: "https://randomuser.me/api/portraits/women/3.jpg" },
];

const Home = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="relative h-125 md:h-150 overflow-hidden">
        {slides.map((slide, index) => (
          <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"}`}>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }}>
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
            <div className="relative h-full flex items-center justify-center text-center text-white px-4">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-lg md:text-xl mb-8">{slide.subtitle}</p>
                <button onClick={() => navigate("/packages")} className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white font-semibold py-3 px-8 rounded-xl transition">
                  Explore Now
                </button>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
        >
          <i className="fa-solid fa-angle-left"></i>
        </button>
        <button onClick={() => setCurrent((prev) => (prev + 1) % slides.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full">
          <i className="fa-solid fa-angle-right"></i>
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, idx) => (
            <button key={idx} onClick={() => setCurrent(idx)} className={`w-2 h-2 rounded-full transition-all ${idx === current ? "bg-white w-6" : "bg-white/50"}`} />
          ))}
        </div>
      </div>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "fa-solid fa-globe", title: "Pan India Coverage", desc: "100+ destinations" },
              { icon: "fa-solid fa-hotel", title: "Handpicked Stays", desc: "Premium hotels" },
              { icon: "fa-solid fa-shield-halved", title: "Safe Travels", desc: "24/7 support" },
              { icon: "fa-solid fa-thumbs-up", title: "Best Price", desc: "INR transparency" },
            ].map((feat, idx) => (
              <div key={idx} className="text-center p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-4xl mb-4">
                  <i className={`${feat.icon} text-teal-600`}></i>
                </div>
                <h3 className="font-bold text-lg mb-2">{feat.title}</h3>
                <p className="text-gray-500">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-teal-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Your Next Indian Adventure?</h2>
          <p className="text-lg mb-8">Get exclusive deals on domestic tour packages</p>
          <button onClick={() => navigate("/contact")} className="bg-white text-teal-700 cursor-pointer hover:bg-gray-100 font-semibold py-3 px-8 rounded-xl transition">
            Enquire Now →
          </button>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">What Our Travelers Say</h2>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">Real experiences from happy travelers across India</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-4">
                  <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <h3 className="font-semibold">{t.name}</h3>
                    <p className="text-sm text-gray-500">{t.location}</p>
                  </div>
                </div>
                <div className="text-yellow-500 text-lg mb-3">{"★".repeat(t.rating)}</div>
                <p className="text-gray-600 italic">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
