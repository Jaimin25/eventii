import React from "react";

export default function BrowserEventsComponent() {
  return (
    <section id="browseEvents" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Browse Events
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover amazing events happening around you
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
              All
            </button>
            <button className="px-6 py-2 rounded-full bg-white text-gray-600 hover:bg-blue-50 transition-colors">
              Technology
            </button>
            <button className="px-6 py-2 rounded-full bg-white text-gray-600 hover:bg-blue-50 transition-colors">
              Business
            </button>
            <button className="px-6 py-2 rounded-full bg-white text-gray-600 hover:bg-blue-50 transition-colors">
              Design
            </button>
            <button className="px-6 py-2 rounded-full bg-white text-gray-600 hover:bg-blue-50 transition-colors">
              Marketing
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow animate__animated animate__fadeIn">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-blue-500 text-sm font-semibold">
                  Technology
                </span>
                <h3 className="text-xl font-bold mt-1">
                  Web Development Summit
                </h3>
              </div>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                250 participants
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Learn from industry experts about the latest web technologies and
              best practices.
            </p>
            <div className="flex justify-between items-center">
              <div className="text-gray-500 text-sm">
                <i className="fas fa-calendar"></i> Mar 15, 2024
              </div>
              <button className="text-blue-500 hover:text-blue-600 font-semibold">
                Join Event →
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow animate__animated animate__fadeIn">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-blue-500 text-sm font-semibold">
                  Business
                </span>
                <h3 className="text-xl font-bold mt-1">Startup Networking</h3>
              </div>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                180 participants
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Connect with fellow entrepreneurs and investors in this exclusive
              networking event.
            </p>
            <div className="flex justify-between items-center">
              <div className="text-gray-500 text-sm">
                <i className="fas fa-calendar"></i> Mar 20, 2024
              </div>
              <button className="text-blue-500 hover:text-blue-600 font-semibold">
                Join Event →
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow animate__animated animate__fadeIn">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-blue-500 text-sm font-semibold">
                  Design
                </span>
                <h3 className="text-xl font-bold mt-1">UX/UI Workshop</h3>
              </div>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                120 participants
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Hands-on workshop to master the principles of modern user
              interface design.
            </p>
            <div className="flex justify-between items-center">
              <div className="text-gray-500 text-sm">
                <i className="fas fa-calendar"></i> Mar 25, 2024
              </div>
              <button className="text-blue-500 hover:text-blue-600 font-semibold">
                Join Event →
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow animate__animated animate__fadeIn">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-blue-500 text-sm font-semibold">
                  Marketing
                </span>
                <h3 className="text-xl font-bold mt-1">
                  Digital Marketing Conference
                </h3>
              </div>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                200 participants
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Explore the latest trends in digital marketing and growth
              strategies.
            </p>
            <div className="flex justify-between items-center">
              <div className="text-gray-500 text-sm">
                <i className="fas fa-calendar"></i> Mar 30, 2024
              </div>
              <button className="text-blue-500 hover:text-blue-600 font-semibold">
                Join Event →
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors">
            Load More Events
          </button>
        </div>
      </div>
    </section>
  );
}
