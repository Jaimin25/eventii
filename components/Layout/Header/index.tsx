import { Constants } from "@/lib/constants";
import Link from "next/link";
import React from "react";

export default function HeaderComponent() {
  return (
    <header className="fixed top-0 z-50 bg-white border-b border-gray-200 w-full">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <p className="text-2xl font-bold text-blue-500">
                {Constants.APP_NAME}
              </p>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              Browse Events
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              Create Event
            </a>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
              Get Started
            </button>
          </div>
        </div>

        <div id="mobile-menu" className="hidden md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="block px-3 py-2 text-gray-600 hover:text-blue-500 transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-600 hover:text-blue-500 transition-colors"
            >
              Browse Events
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-600 hover:text-blue-500 transition-colors"
            >
              Create Event
            </a>
            <button className="w-full mt-2 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
