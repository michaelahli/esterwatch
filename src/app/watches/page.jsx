"use client";
import React, { useEffect, useState } from "react";

const Watches = () => {
  const [watches, setWatches] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedWatches, setSelectedWatches] = useState([]);
  const [quickViewWatch, setQuickViewWatch] = useState(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    collection_id: "",
    minPrice: 0,
    maxPrice: 100000,
    caseMaterial: [],
    movementType: [],
    waterResistance: [],
    strapMaterial: [],
  });
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [watchesRes, collectionsRes] = await Promise.all([
          fetch("/api/list-watches", {
            method: "POST",
            body: JSON.stringify({ ...filters, sortBy, page }),
          }),
          fetch("/api/list-collections", {
            method: "POST",
          }),
        ]);

        if (!watchesRes.ok || !collectionsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const watchesData = await watchesRes.json();
        const collectionsData = await collectionsRes.json();

        setWatches(watchesData.watches || []);
        setCollections(collectionsData.collections || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load watches");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [filters, sortBy, page]);

  const toggleWatchComparison = (watch) => {
    setSelectedWatches((prev) => {
      if (prev.find((w) => w.id === watch.id)) {
        return prev.filter((w) => w.id !== watch.id);
      }
      if (prev.length < 3) {
        return [...prev, watch];
      }
      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="relative h-[400px]">
        <img
          src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg"
          alt="Luxury watch collection showcase"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-crimson-text text-white text-center">
            Our Timepieces
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4 space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="font-inter text-xl font-bold text-gray-900 dark:text-white mb-4">
                Filters
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Collection
                  </label>
                  <select
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 dark:text-white"
                    value={filters.collection_id}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        collection_id: e.target.value,
                      }))
                    }
                  >
                    <option value="">All Collections</option>
                    {collections.map((collection) => (
                      <option key={collection.id} value={collection.id}>
                        {collection.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price Range
                  </label>
                  <div className="flex gap-4 items-center">
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          maxPrice: e.target.value,
                        }))
                      }
                      className="w-full"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Up to Rp {filters.maxPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Case Material
                  </label>
                  <div className="space-y-2">
                    {["Stainless Steel", "Gold", "Platinum", "Titanium"].map(
                      (material) => (
                        <label key={material} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.caseMaterial.includes(material)}
                            onChange={(e) => {
                              const newMaterials = e.target.checked
                                ? [...filters.caseMaterial, material]
                                : filters.caseMaterial.filter(
                                  (m) => m !== material
                                );
                              setFilters((prev) => ({
                                ...prev,
                                caseMaterial: newMaterials,
                              }));
                            }}
                            className="mr-2"
                          />
                          <span className="text-gray-700 dark:text-gray-300">
                            {material}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <select
                  className="border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 dark:text-white"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="name_asc">Name: A to Z</option>
                </select>

                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${viewMode === "grid" ? "bg-gray-200 dark:bg-gray-700" : ""
                      }`}
                  >
                    <i className="fas fa-th-large"></i>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${viewMode === "list" ? "bg-gray-200 dark:bg-gray-700" : ""
                      }`}
                  >
                    <i className="fas fa-list"></i>
                  </button>
                </div>
              </div>

              {selectedWatches.length > 0 && (
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {selectedWatches.length} watches selected for comparison
                  </span>
                </div>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-gray-700 dark:text-gray-300 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gray-900 dark:bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800"
                >
                  Try Again
                </button>
              </div>
            ) : watches.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-700 dark:text-gray-300">
                  No watches match your selected filters
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-6"
                }
              >
                {watches.map((watch) => (
                  <div
                    key={watch.id}
                    className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden
                      ${viewMode === "list" ? "flex" : ""}`}
                  >
                    <div
                      className={`relative ${viewMode === "list" ? "w-1/3" : "aspect-square"
                        }`}
                    >
                      <img
                        src={watch.main_image_url}
                        alt={watch.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => toggleWatchComparison(watch)}
                        className={`absolute top-2 right-2 p-2 rounded-full bg-white dark:bg-gray-800 shadow
                          ${selectedWatches.find((w) => w.id === watch.id)
                            ? "text-blue-500"
                            : ""
                          }`}
                      >
                        <i className="fas fa-compress-alt"></i>
                      </button>
                    </div>

                    <div
                      className={`p-6 ${viewMode === "list" ? "w-2/3" : ""}`}
                    >
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {watch.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        Model: {watch.model_number}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Rp {watch.price?.toLocaleString()}
                      </p>

                      <div className="space-y-2 mb-4">
                        {watch.specifications &&
                          Object.entries(watch.specifications)
                            .slice(0, 3)
                            .map(([key, value]) => (
                              <p
                                key={key}
                                className="text-sm text-gray-600 dark:text-gray-400"
                              >
                                {key}: {value}
                              </p>
                            ))}
                      </div>

                      <div className="flex gap-4">
                        <a
                          href={`/watches/${watch.id}`}
                          className="bg-gray-900 dark:bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
                        >
                          View Details
                        </a>
                        <button
                          onClick={() => setQuickViewWatch(watch)}
                          className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white"
                        >
                          Quick View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 dark:text-white"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={watches.length < 12}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 dark:text-white"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {quickViewWatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {quickViewWatch.name}
                </h2>
                <button
                  onClick={() => setQuickViewWatch(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={quickViewWatch.main_image_url}
                    alt={quickViewWatch.name}
                    className="w-full rounded-lg"
                  />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Rp {quickViewWatch.price?.toLocaleString()}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {quickViewWatch.description}
                  </p>
                  <div className="space-y-2 mb-6">
                    {quickViewWatch.specifications &&
                      Object.entries(quickViewWatch.specifications).map(
                        ([key, value]) => (
                          <p
                            key={key}
                            className="text-sm text-gray-600 dark:text-gray-400"
                          >
                            {key}: {value}
                          </p>
                        )
                      )}
                  </div>
                  <a
                    href={`/watches/${quickViewWatch.id}`}
                    className="block text-center bg-gray-900 dark:bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800"
                  >
                    View Full Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedWatches.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="font-bold text-gray-900 dark:text-white">
                  Compare Watches
                </h3>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedWatches.length} of 3 selected
                </span>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedWatches([])}
                  className="text-red-600 hover:text-red-700"
                >
                  Clear All
                </button>
                {selectedWatches.length > 1 && (
                  <button
                    className="bg-gray-900 dark:bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
                    onClick={() => {
                      const params = new URLSearchParams(
                        selectedWatches.map((w) => ["id", w.id])
                      );
                      window.location.href = `/compare?${params.toString()}`;
                    }}
                  >
                    Compare Now
                  </button>
                )}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {selectedWatches.map((watch) => (
                <div key={watch.id} className="flex items-center gap-4">
                  <img
                    src={watch.main_image_url}
                    alt={watch.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {watch.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Rp {watch.price?.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleWatchComparison(watch)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Watches;
