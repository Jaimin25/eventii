import { Constants } from "@/lib/constants";
import Link from "next/link";
import React from "react";
import MobileMenu from "./mobile-menu";

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
            <Link
              href="/events/browse"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              Browse Events
            </Link>
            <Link
              href="/events/create"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              Create Event
            </Link>
          </div>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
