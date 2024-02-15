import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
      <p className="text-gray-700 mb-4">
        Have any questions or concerns? Reach out to us! We're here to help.
      </p>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        {/* Contact Form */}
        <div className="flex-1">
          <form className="max-w-md">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Your Name"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full border border-gray-300 p-2 rounded-md"
                rows="4"
                placeholder="Your message..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="flex-1">
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-xl font-bold mb-2">Our Contact Information</h3>
            <p className="text-gray-700">
              Email: <a href="mailto:info@example.com">portronics@gmail.com</a>
            </p>
            <p className="text-gray-700">
              Phone: <a href="tel:+1234567890">+91 8667383637</a>
            </p>
            <p className="text-gray-700">
              Address: 1234 Audio Street,Cochin,Kerala,675563
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
