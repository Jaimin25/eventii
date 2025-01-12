import EventCards from "@/components/Cards/EventCards";
import React from "react";

export default function BrowserEventsComponent() {
  return (
    <div className="py-4 w-full px-6 xl:px-80 grid grid-cols-1 gap-6">
      <EventCards display={null} />
    </div>
  );
}
