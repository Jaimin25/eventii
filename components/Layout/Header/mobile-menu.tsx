"use client";

import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function MobileMenu() {
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  return (
    <div className="md:hidden block">
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger>
          <Menu />
        </PopoverTrigger>
        <PopoverContent className="w-56">
          <div className="flex flex-col space-y-4">
            <Link
              href="/events/browse"
              onClick={() => setPopoverOpen(false)}
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              Browse Events
            </Link>
            <Link
              href="/events/create"
              onClick={() => setPopoverOpen(false)}
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              Create Event
            </Link>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
