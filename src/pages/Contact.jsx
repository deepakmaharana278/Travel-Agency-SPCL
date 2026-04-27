import React, { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", city: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name required";
    if (!formData.email.trim()) newErrors.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone required";
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "10-digit number";
    if (!formData.message.trim()) newErrors.message = "Message required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      try {
        await addDoc(collection(db, "enquiries"), { ...formData, createdAt: new Date().toISOString() });
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", city: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } catch (error) {
        alert("Failed to send message");
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div>
      <div className="bg-teal-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
          <p className="text-lg">We'd love to help you plan your Indian journey</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4"><i className="fas fa-envelope"></i> hello@bharatyatra.com</div>
              <div className="flex items-center gap-4"><i className="fas fa-phone"></i> +91 8984056080</div>
              <div className="flex items-center gap-4"><i className="fas fa-location-dot"></i> Connaught Place, Bhubanswar</div>
            </div>
            <div className="mt-8 p-4 bg-orange-50 rounded-xl">
              <p className="font-semibold text-orange-700">Office Hours:</p>
              <p>Mon-Sat: 10AM - 7PM</p>
              <p>Sunday: 10AM - 2PM</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {submitted && <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">Thank you! We'll contact you soon.</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Mobile Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div>
                <input type="text" name="city" placeholder="City" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full p-3 border rounded-lg" />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
              <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
