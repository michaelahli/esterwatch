"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

function MainComponent() {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Fetch watches data
  useEffect(() => {
    async function fetchWatches() {
      try {
        const response = await fetch("/api/list-watches", {
          method: "POST",
          body: JSON.stringify({}),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch watches");
        }
        const data = await response.json();
        setWatches(data.watches);
      } catch (err) {
        setError("Unable to load watches. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchWatches();
  }, []);

  // Handle newsletter subscription
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setError("");
      } else {
        setError(data.error);
        setMessage("");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      setMessage("");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-900 font-inter">Loading...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-red-500 font-inter">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-inter font-bold text-xl text-gray-900 dark:text-white">
              ESTER WATCH
            </div>
            <div className="hidden md:flex space-x-8 font-inter text-gray-700 dark:text-gray-300">
              <a
                href="/collections"
                className="hover:text-gray-900 dark:hover:text-white"
              >
                Collections
              </a>
              <a
                href="/watches"
                className="hover:text-gray-900 dark:hover:text-white"
              >
                Watches
              </a>
              <a
                href="/contact"
                className="hover:text-gray-900 dark:hover:text-white"
              >
                Contact
              </a>
              <a
                href="/about"
                className="hover:text-gray-900 dark:hover:text-white"
              >
                About
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[80vh] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg"
              alt="Luxury watch showcase"
              fill
              className="object-cover"
              priority // Preload above-the-fold image
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div className="relative h-full flex items-center justify-center text-center">
            <div className="max-w-3xl px-4">
              <h1 className="text-4xl md:text-6xl font-inter font-bold text-white mb-6">
                Timeless Elegance
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Discover our collection of exceptional timepieces
              </p>
              <a
                href="/collections"
                className="inline-block bg-white text-gray-900 px-8 py-3 rounded font-inter hover:bg-gray-100 transition-colors"
              >
                Explore Collections
              </a>
            </div>
          </div>
        </section>

        {/* Featured Timepieces */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-inter font-bold text-gray-900 dark:text-white mb-8">
            Featured Timepieces
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {watches.slice(0, 3).map((watch) => (
              <div key={watch.id} className="group">
                <div className="aspect-square overflow-hidden rounded-lg mb-4">
                  <Image
                    src={watch.main_image_url}
                    alt={watch.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-inter font-bold text-gray-900 dark:text-white">
                  {watch.name}
                </h3>
                <p className="font-inter text-gray-700 dark:text-gray-300">
                  {watch.model_number}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* New Arrivals */}
        <section className="bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-inter font-bold text-gray-900 dark:text-white mb-8">
              New Arrivals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {watches.slice(3, 7).map((watch) => (
                <div key={watch.id} className="group">
                  <div className="aspect-square overflow-hidden rounded-lg mb-4">
                    <Image
                      src={watch.main_image_url}
                      alt={watch.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-inter font-bold text-gray-900 dark:text-white">
                    {watch.name}
                  </h3>
                  <p className="font-inter text-gray-700 dark:text-gray-300">
                    {watch.model_number}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Heritage */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-inter font-bold text-gray-900 dark:text-white mb-6">
                Our Heritage
              </h2>
              <p className="font-inter text-gray-700 dark:text-gray-300 mb-6">
                Since 2025, we have been selling exceptional timepieces that
                combine traditional watchmaking with innovative technology.
              </p>
              <a
                href="/about"
                className="inline-block border border-gray-900 dark:border-white text-gray-900 dark:text-white px-6 py-2 rounded font-inter hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors"
              >
                Learn More
              </a>
            </div>
            <div className="aspect-square rounded-lg overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/9979684/pexels-photo-9979684.jpeg"
                alt="Watchmaker at work"
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-inter font-bold text-gray-900 dark:text-white mb-4">
                Stay Updated
              </h2>
              <p className="font-inter text-gray-700 dark:text-gray-300 mb-6">
                Subscribe to receive updates about new collections and exclusive
                offers.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-4">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-inter"
                  required
                />
                <button
                  type="submit"
                  className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-2 rounded font-inter hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                >
                  Subscribe
                </button>
              </form>
              {message && (
                <p style={{ color: "green" }} className="my-2">
                  {message}
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-inter font-bold text-gray-900 dark:text-white mb-4">
                About
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/about"
                    className="font-inter text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Our Story
                  </a>
                </li>
                <li>
                  <a
                    href="/craftmanship"
                    className="font-inter text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Craftmanship
                  </a>
                </li>
                <li>
                  <a
                    href="/sustainability"
                    className="font-inter text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Sustainability
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-inter font-bold text-gray-900 dark:text-white mb-4">
                Collections
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/collections/classic"
                    className="font-inter text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Classic
                  </a>
                </li>
                <li>
                  <a
                    href="/collections/sport"
                    className="font-inter text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Sport
                  </a>
                </li>
                <li>
                  <a
                    href="/collections/limited"
                    className="font-inter text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Limited Edition
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-inter font-bold text-gray-900 dark:text-white mb-4">
                Contact
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/contact"
                    className="font-inter text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="/stores"
                    className="font-inter text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Store Locator
                  </a>
                </li>
                <li>
                  <a
                    href="/support"
                    className="font-inter text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center font-inter text-gray-700 dark:text-gray-300">
              © 2025 ESTER WATCH. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainComponent;
