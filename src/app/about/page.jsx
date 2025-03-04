"use client";
import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <section className="relative h-[80vh]">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/9979684/pexels-photo-9979684.jpeg"
            alt="Heritage watchmaking workshop showing traditional craftsmanship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-inter font-bold text-white mb-6">
              Crafting Excellence Since 1875
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto font-inter">
              A legacy of precision, innovation, and timeless elegance
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-inter font-bold text-gray-900 dark:text-white mb-6">
              Our Heritage
            </h2>
            <p className="text-gray-700 dark:text-gray-300 font-inter mb-6">
              Founded in 1875 in the heart of Switzerland, LUXWATCH began as a
              small workshop dedicated to the art of watchmaking. Through
              generations of master craftsmen, we have maintained our commitment
              to excellence while embracing innovation.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="h-px w-12 bg-gray-300 dark:bg-gray-700 mt-4 mr-4"></div>
                <div>
                  <h3 className="font-inter font-bold text-gray-900 dark:text-white mb-2">
                    1875
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 font-inter">
                    Establishment of the first workshop
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-px w-12 bg-gray-300 dark:bg-gray-700 mt-4 mr-4"></div>
                <div>
                  <h3 className="font-inter font-bold text-gray-900 dark:text-white mb-2">
                    1925
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 font-inter">
                    Introduction of the first automatic movement
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-px w-12 bg-gray-300 dark:bg-gray-700 mt-4 mr-4"></div>
                <div>
                  <h3 className="font-inter font-bold text-gray-900 dark:text-white mb-2">
                    1975
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 font-inter">
                    Launch of the iconic Precision series
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src="https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg"
              alt="Historical LUXWATCH workshop"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-inter font-bold text-gray-900 dark:text-white mb-16 text-center">
            Craftsmanship
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <i className="fas fa-tools text-4xl text-gray-900 dark:text-white mb-6"></i>
              <h3 className="font-inter font-bold text-gray-900 dark:text-white mb-4">
                Master Watchmakers
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-inter">
                Our timepieces are crafted by expert artisans with decades of
                experience
              </p>
            </div>
            <div className="text-center">
              <i className="fas fa-cog text-4xl text-gray-900 dark:text-white mb-6"></i>
              <h3 className="font-inter font-bold text-gray-900 dark:text-white mb-4">
                Traditional Techniques
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-inter">
                Preserving centuries-old watchmaking methods
              </p>
            </div>
            <div className="text-center">
              <i className="fas fa-microchip text-4xl text-gray-900 dark:text-white mb-6"></i>
              <h3 className="font-inter font-bold text-gray-900 dark:text-white mb-4">
                Modern Innovation
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-inter">
                Embracing cutting-edge technology in precision engineering
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-inter font-bold text-gray-900 dark:text-white mb-16 text-center">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="font-inter font-bold text-gray-900 dark:text-white mb-4">
              Excellence in Watchmaking
            </h3>
            <p className="text-gray-700 dark:text-gray-300 font-inter">
              Commitment to the highest standards of precision and quality in
              every timepiece
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="font-inter font-bold text-gray-900 dark:text-white mb-4">
              Sustainable Practices
            </h3>
            <p className="text-gray-700 dark:text-gray-300 font-inter">
              Responsible sourcing and eco-friendly manufacturing processes
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="font-inter font-bold text-gray-900 dark:text-white mb-4">
              Customer Experience
            </h3>
            <p className="text-gray-700 dark:text-gray-300 font-inter">
              Personalized service and lifetime support for every client
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-inter font-bold mb-16 text-center">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6">
                <img
                  src="https://images.pexels.com/photos/3153204/pexels-photo-3153204.jpeg"
                  alt="Master watchmaker at work"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-inter font-bold mb-2">Master Watchmakers</h3>
              <p className="text-gray-300 font-inter">
                With over 30 years of expertise
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6">
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
                  alt="Design team collaborating"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-inter font-bold mb-2">Design Team</h3>
              <p className="text-gray-300 font-inter">
                Creating timeless aesthetics
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6">
                <img
                  src="https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg"
                  alt="Customer service representative"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-inter font-bold mb-2">Service Experts</h3>
              <p className="text-gray-300 font-inter">
                Dedicated to your satisfaction
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-inter font-bold text-gray-900 dark:text-white mb-16 text-center">
          Manufacturing Excellence
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <img
              src="https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg"
              alt="Swiss manufacturing facility"
              className="rounded-lg mb-6"
            />
            <h3 className="font-inter font-bold text-gray-900 dark:text-white mb-4">
              Swiss Workshop
            </h3>
            <p className="text-gray-700 dark:text-gray-300 font-inter">
              State-of-the-art facilities in the heart of Switzerland
            </p>
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/3862632/pexels-photo-3862632.jpeg"
              alt="Quality control process"
              className="rounded-lg mb-6"
            />
            <h3 className="font-inter font-bold text-gray-900 dark:text-white mb-4">
              Quality Control
            </h3>
            <p className="text-gray-700 dark:text-gray-300 font-inter">
              Rigorous testing and inspection at every stage
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-inter font-bold text-gray-900 dark:text-white mb-8">
            Mission & Vision
          </h2>
          <p className="text-gray-700 dark:text-gray-300 font-inter max-w-3xl mx-auto mb-16">
            To create exceptional timepieces that combine traditional
            craftsmanship with innovative technology, while maintaining our
            commitment to sustainability and excellence.
          </p>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
            <h3 className="font-inter font-bold text-gray-900 dark:text-white mb-4">
              Sustainability Commitment
            </h3>
            <p className="text-gray-700 dark:text-gray-300 font-inter">
              We are dedicated to reducing our environmental impact through
              responsible sourcing, eco-friendly packaging, and sustainable
              manufacturing practices.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
