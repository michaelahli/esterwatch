"use client";
import React, { useState } from "react";

const Service = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    model: "",
    serviceType: "",
    date: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <section className="relative h-[60vh]">
        <img
          src="https://images.pexels.com/photos/9979684/pexels-photo-9979684.jpeg"
          alt="Master watchmaker working on luxury timepiece"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-crimson-text text-white mb-6">
              Expert Care for Luxury Timepieces
            </h1>
            <p className="text-xl text-white/90 font-inter">
              Preserving the excellence of your timepiece with precision and
              expertise
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
            <i className="fas fa-tools text-3xl text-gray-900 dark:text-white mb-6"></i>
            <h2 className="text-2xl font-crimson-text text-gray-900 dark:text-white mb-6">
              Watch Service & Repair
            </h2>
            <ul className="space-y-4 font-inter text-gray-700 dark:text-gray-300">
              <li>Complete service</li>
              <li>Movement repair</li>
              <li>Crystal replacement</li>
              <li>Water resistance testing</li>
            </ul>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
            <i className="fas fa-clock text-3xl text-gray-900 dark:text-white mb-6"></i>
            <h2 className="text-2xl font-crimson-text text-gray-900 dark:text-white mb-6">
              Watch Care & Maintenance
            </h2>
            <ul className="space-y-4 font-inter text-gray-700 dark:text-gray-300">
              <li>Professional cleaning</li>
              <li>Battery replacement</li>
              <li>Strap/bracelet adjustment</li>
              <li>Polishing service</li>
            </ul>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
            <i className="fas fa-shield-alt text-3xl text-gray-900 dark:text-white mb-6"></i>
            <h2 className="text-2xl font-crimson-text text-gray-900 dark:text-white mb-6">
              Warranty Services
            </h2>
            <ul className="space-y-4 font-inter text-gray-700 dark:text-gray-300">
              <li>Warranty registration</li>
              <li>International warranty coverage</li>
              <li>Extended warranty options</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-crimson-text text-gray-900 dark:text-white text-center mb-12">
            Book a Service
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
              <input
                type="text"
                name="model"
                placeholder="Watch Model"
                value={formData.model}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              >
                <option value="">Select Service Type</option>
                <option value="complete">Complete Service</option>
                <option value="repair">Repair</option>
                <option value="maintenance">Maintenance</option>
                <option value="warranty">Warranty Service</option>
              </select>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
            <textarea
              name="notes"
              placeholder="Additional Notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-lg font-inter hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Schedule Service
            </button>
          </form>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-crimson-text text-gray-900 dark:text-white text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-inter font-bold text-gray-900 dark:text-white mb-4">
              How long does a service take?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 font-inter">
              Standard service typically takes 2-3 weeks, depending on the
              complexity and parts required.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-inter font-bold text-gray-900 dark:text-white mb-4">
              What's included in a complete service?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 font-inter">
              A complete service includes movement overhaul, case and bracelet
              refinishing, water resistance testing, and timing adjustment.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-crimson-text text-gray-900 dark:text-white mb-6">
                Contact Service Department
              </h2>
              <div className="space-y-4 font-inter text-gray-700 dark:text-gray-300">
                <p>
                  <i className="fas fa-phone mr-2"></i> +1 (555) 123-4567
                </p>
                <p>
                  <i className="fas fa-envelope mr-2"></i> service@luxwatch.com
                </p>
                <p>
                  <i className="fas fa-clock mr-2"></i> Mon-Fri: 9:00 AM - 6:00
                  PM
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-crimson-text text-gray-900 dark:text-white mb-6">
                Service Center Locations
              </h2>
              <div className="space-y-4 font-inter text-gray-700 dark:text-gray-300">
                <p>New York: 123 Fifth Avenue</p>
                <p>London: 45 Bond Street</p>
                <p>Geneva: 78 Rue du Rhône</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Service;
