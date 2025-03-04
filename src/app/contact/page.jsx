"use client";
import React, { useState } from "react";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
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

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-inter font-bold text-gray-900 dark:text-white mb-8 text-center">
              Contact Us
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
              We're here to assist you with any questions about our timepieces,
              services, or general inquiries.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div>
                <h2 className="text-xl font-inter font-bold text-gray-900 dark:text-white mb-4">
                  Visit Our Boutique
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-400">
                  <p>Piazza the Mozia</p>
                  <p>Kab. Tangerang, 15339</p>
                  <p>Indonesia</p>
                  <p className="pt-4">Monday - Saturday: 10:00 AM - 7:00 PM</p>
                  <p>Sunday: 12:00 PM - 6:00 PM</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-inter font-bold text-gray-900 dark:text-white mb-4">
                  Get in Touch
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-400">
                  <p>Phone: +62 8585-1040-642</p>
                  <p>Email: contact@esterwatch.com</p>
                  <p>
                    For immediate assistance during business hours, please directly go to whatsapp.
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-gray-50 dark:bg-gray-800 p-8 rounded-lg"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded font-inter hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </div>

              {status === "success" && (
                <div className="text-green-600 dark:text-green-400 text-center">
                  Thank you for your message. We'll get back to you soon.
                </div>
              )}

              {status === "error" && (
                <div className="text-red-600 dark:text-red-400 text-center">
                  There was an error sending your message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </main>

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

            {/* <div> */}
            {/*   <h3 className="font-inter font-bold text-gray-900 dark:text-white mb-4"> */}
            {/*     Service */}
            {/*   </h3> */}
            {/*   <ul className="space-y-2"> */}
            {/*     <li> */}
            {/*       <a */}
            {/*         href="/service/repair" */}
            {/*         className="font-inter text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" */}
            {/*       > */}
            {/*         Watch Service */}
            {/*       </a> */}
            {/*     </li> */}
            {/*     <li> */}
            {/*       <a */}
            {/*         href="/service/care" */}
            {/*         className="font-inter text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" */}
            {/*       > */}
            {/*         Watch Care */}
            {/*       </a> */}
            {/*     </li> */}
            {/*     <li> */}
            {/*       <a */}
            {/*         href="/service/warranty" */}
            {/*         className="font-inter text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" */}
            {/*       > */}
            {/*         Warranty */}
            {/*       </a> */}
            {/*     </li> */}
            {/*   </ul> */}
            {/* </div> */}

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

export default ContactUs;
