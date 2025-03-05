'use client'
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';

const WatchModel = () => {
  const [watch, setWatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedWatches, setRelatedWatches] = useState([]);

  const watchId = useParams()['id'];

  useEffect(() => {
    async function fetchWatch() {
      try {
        const params = new URLSearchParams(window.location.search);

        if (!watchId) {
          throw new Error("Watch ID is required");
        }

        const response = await fetch("/api/watches/get", {
          method: "POST",
          body: JSON.stringify({ id: watchId }),
        });

        if (!response.ok) {
          const data = await response.json();
          console.error(data);
          throw new Error("Failed to fetch watch details");
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setWatch(data.watch);

        // Fetch related watches from the same collection
        if (data.watch.collection_id) {
          const relatedResponse = await fetch("/api/list-watches", {
            method: "POST",
            body: JSON.stringify({ collection_id: data.watch.collection_id }),
          });

          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json();
            setRelatedWatches(
              relatedData.watches
                .filter((w) => w.id !== data.watch.id)
                .slice(0, 4),
            );
          }
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWatch();
  }, []);

  const handleAsk = () => {
    window.location.href = `https://wa.me/6285851040642/?text=Halo saya ingin menanyakan jam nomor ${watchId} apakah masih tersedia ?`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-900 dark:text-white font-inter text-xl">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md text-center">
          <p className="text-red-500 font-inter text-xl mb-4">{error}</p>
          <a
            href="/collections"
            className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-2 rounded font-inter"
          >
            Browse Collections
          </a>
        </div>
      </div>
    );
  }

  if (!watch) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md text-center">
          <p className="text-gray-900 dark:text-white font-inter text-xl mb-4">
            Watch not found
          </p>
          <a
            href="/collections"
            className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-2 rounded font-inter"
          >
            Browse Collections
          </a>
        </div>
      </div>
    );
  }

  const galleryImages = [watch.main_image_url, ...(watch.gallery_images || [])];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          {watch.collection && (
            <a
              href={`/collections/${watch.collection.slug}`}
              className="text-gray-600 dark:text-gray-400 font-inter hover:text-gray-900 dark:hover:text-white"
            >
              ← Back to {watch.collection.name}
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="aspect-square overflow-hidden rounded-lg mb-4">
              <img
                src={galleryImages[selectedImage]}
                alt={`${watch.name} - View ${selectedImage + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${selectedImage === index
                    ? "border-gray-900 dark:border-white"
                    : "border-transparent"
                    }`}
                >
                  <img
                    src={image}
                    alt={`${watch.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-inter font-bold text-gray-900 dark:text-white mb-2">
              {watch.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 font-inter mb-4">
              Model: {watch.model_number}
            </p>
            <p className="text-3xl font-inter font-bold text-gray-900 dark:text-white mb-8">
              Rp {watch.price?.toLocaleString()}
            </p>

            <div className="flex gap-4 mb-12">
              <button
                className={`flex-1 px-8 py-3 rounded font-inter ${watch.in_stock
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  }`}
                disabled={!watch.in_stock}
                onClick={handleAsk}
              >
                {watch.in_stock ? "Ask" : "Out of Stock"}
              </button>
              {/* <button className="flex-1 px-8 py-3 rounded font-inter border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900"> */}
              {/*   Book Appointment */}
              {/* </button> */}
            </div>

            <div className="prose dark:prose-invert max-w-none mb-12">
              <h2 className="text-2xl font-inter font-bold text-gray-900 dark:text-white mb-4">
                Description
              </h2>
              <p className="font-inter text-gray-700 dark:text-gray-300">
                {watch.description}
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-inter font-bold text-gray-900 dark:text-white mb-4">
                Features
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {watch.features?.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center font-inter text-gray-700 dark:text-gray-300"
                  >
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-inter font-bold text-gray-900 dark:text-white mb-4">
                Specifications
              </h2>
              <div className="border rounded-lg overflow-hidden">
                {Object.entries(watch.specifications || {}).map(
                  ([key, value], index) => (
                    <div
                      key={key}
                      className={`grid grid-cols-2 gap-4 p-4 ${index % 2 === 0
                        ? "bg-gray-50 dark:bg-gray-800"
                        : "bg-white dark:bg-gray-900"
                        }`}
                    >
                      <div className="font-inter font-medium text-gray-900 dark:text-white">
                        {key}
                      </div>
                      <div className="font-inter text-gray-700 dark:text-gray-300">
                        {value}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-3xl font-inter font-bold text-gray-900 dark:text-white mb-8">
            Related Watches
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {relatedWatches.map((relatedWatch) => (
              <a
                key={relatedWatch.id}
                href={`/watches/${relatedWatch.id}`}
                className="group"
              >
                <div className="aspect-square overflow-hidden rounded-lg mb-4">
                  <img
                    src={relatedWatch.main_image_url}
                    alt={relatedWatch.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-inter font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300">
                  {relatedWatch.name}
                </h3>
                <p className="font-inter text-gray-600 dark:text-gray-400">
                  Rp {relatedWatch.price?.toLocaleString()}
                </p>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-inter font-bold text-gray-900 dark:text-white mb-4">
              Technical Details
            </h3>
            <p className="font-inter text-gray-700 dark:text-gray-300">
              Each timepiece undergoes rigorous testing to ensure perfect
              precision and reliability. Our watches are certified by the Swiss
              Official Chronometer Testing Institute (COSC).
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-inter font-bold text-gray-900 dark:text-white mb-4">
              Care Instructions
            </h3>
            <p className="font-inter text-gray-700 dark:text-gray-300">
              To maintain your timepiece's pristine condition, we recommend
              regular servicing every 3-5 years. Store in a cool, dry place and
              avoid exposure to strong magnetic fields.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-inter font-bold text-gray-900 dark:text-white mb-4">
              Warranty Information
            </h3>
            <p className="font-inter text-gray-700 dark:text-gray-300">
              Each watch comes with a 5-year international warranty covering
              manufacturing defects. Register your timepiece online for extended
              coverage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchModel;
