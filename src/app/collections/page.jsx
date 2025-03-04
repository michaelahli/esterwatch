'use client'

import { useEffect, useState } from "react";

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchCollections() {
      try {
        const response = await fetch("/api/list-collections", {
          method: "POST",
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setCollections(data.collections);
      } catch (err) {
        setError("Unable to load collections");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCollections();
  }, []);

  const filteredCollections = collections.filter((collection) =>
    collection.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative bg-[#1a1a1a] text-white py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg"
            alt="Luxury watches background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Our Collections
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our curated selection of exceptional timepieces, each
            telling its own unique story
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Featured Collections
          </h2>
          <input
            type="text"
            placeholder="Search collections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg mb-3"></div>
                <div className="bg-gray-200 dark:bg-gray-700 h-6 w-2/3 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-gray-700 dark:text-gray-300">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && filteredCollections.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-700 dark:text-gray-300">
              No collections found
            </p>
          </div>
        )}

        {!loading && !error && filteredCollections.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCollections.map((collection) => (
              <div
                key={collection.id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={
                      collection.hero_image_url ||
                      "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg"
                    }
                    alt={`${collection.name} collection`}
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {collection.description ||
                      "Discover our exclusive collection of premium timepieces."}
                  </p>
                  <a
                    href={`/collections/${collection.slug}`}
                    className="inline-flex items-center text-[#9f7a2f] hover:text-[#b38d3f] font-semibold"
                  >
                    Explore Collection
                    <svg
                      className="ml-2 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Collections;
