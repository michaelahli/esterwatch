'use client'
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';

const CollectionDetails = () => {
  const [collection, setCollection] = useState(null);
  const [watches, setWatches] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterPrice, setFilterPrice] = useState("all");
  const [filterInStock, setFilterInStock] = useState("all");

  const slug = useParams()['slug'];

  useEffect(() => {
    async function fetchCollection() {
      try {
        const response = await fetch("/api/get-collection", {
          method: "POST",
          body: JSON.stringify({ slug }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch collection");
        }

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setCollection(data.collection);
        setWatches(data.watches);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCollection();
  }, [slug]);

  const filteredWatches = watches.filter((watch) => {
    if (
      filterInStock !== "all" &&
      watch.in_stock !== (filterInStock === "inStock")
    ) {
      return false;
    }
    if (filterPrice !== "all") {
      const price = parseInt(watch.price);
      switch (filterPrice) {
        case "under1000000":
          return price < 1000000;
        case "1000000to5000000":
          return price >= 1000000 && price <= 5000000;
        case "over5000000":
          return price > 5000000;
        default:
          return true;
      }
    }
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="h-[400px] bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array.from({ length: 6 })].map((_, i) => (
              <div
                key={i}
                className="h-[300px] bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-900 dark:text-white font-inter text-lg mb-4">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-900 dark:bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-900 dark:text-white font-inter text-lg mb-4">
            Collection not found
          </p>
          <a
            href="/collections"
            className="bg-gray-900 dark:bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            View All Collections
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-12">
      <div className="relative h-[500px] mb-12">
        <img
          src={collection.hero_image_url}
          alt={collection.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-white font-inter font-bold text-4xl md:text-6xl mb-4">
              {collection.name}
            </h1>
            <p className="text-white font-inter text-lg md:text-xl max-w-2xl mx-auto px-4">
              {collection.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-inter">
            Browse Collection
          </h2>
          <div className="flex gap-4 flex-wrap">
            <select
              name="price-filter"
              className="bg-white dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 font-inter"
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="under1000000">Under Rp 1.000.000</option>
              <option value="1000000to5000000">Rp 1.000.000 - Rp 5.000.000</option>
              <option value="over5000000">Over Rp 5.000.000</option>

            </select>
            <select
              name="stock-filter"
              className="bg-white dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 font-inter"
              value={filterInStock}
              onChange={(e) => setFilterInStock(e.target.value)}
            >
              <option value="all">All Availability</option>
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
            </select>
          </div>
        </div>

        {filteredWatches.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-700 dark:text-gray-300 font-inter text-lg">
              No watches match your selected filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredWatches.map((watch) => (
              <div
                key={watch.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="aspect-square relative">
                  <img
                    src={watch.main_image_url}
                    alt={`${watch.name} - ${watch.model_number}`}
                    className="w-full h-full object-cover"
                  />
                  {!watch.in_stock && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded text-sm font-inter">
                      Out of Stock
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white font-inter mb-2">
                    {watch.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 font-inter mb-4 line-clamp-2">
                    {watch.model_number}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 font-inter mb-4 line-clamp-2">
                    {watch.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900 dark:text-white font-inter">
                      Rp {watch.price?.toLocaleString()}
                    </span>
                    <a
                      href={`/watches/${watch.id}`}
                      className="bg-gray-900 dark:bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors font-inter"
                    >
                      Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CollectionDetails;
