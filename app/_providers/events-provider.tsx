"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { toast } from "sonner";

export interface EventType {
  Event_ID: string;
  Event_Name: string;
  Date: string;
  participantCount: number;
  Description: string;
  Place: string;
  Start_Time: string;
}

interface EventSummaryType {
  totalEvents: number;
  totalParticipants: number;
}

// Define the shape of the context
interface EventContextType {
  events: EventType[] | string;
  eventSummary: EventSummaryType | undefined;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<EventType[] | string>("");
  const [eventSummary, setEventSummary] = useState<EventSummaryType>();

  useEffect(() => {
    async function fetchEvents() {
      try {
        setEvents("loading");
        const res = await fetch("api/events/getEvents");
        const data = await res.json();
        if (data.status === 200) {
          setEvents(data.message);
        } else {
          toast.error("Error fetching events");
          setEvents([]);
        }
      } catch (error) {
        toast.error("Error fetching summary data: " + (error as Error).message);
      }
    }

    async function fetchData() {
      try {
        const res = await fetch("api/events/getSummary");
        const data = await res.json();
        if (data.status === 200) {
          setEventSummary(data.message);
        } else {
          toast.error("Error fetching events");
        }
      } catch (error) {
        toast.error("Error fetching summary data: " + (error as Error).message);
      }
    }

    fetchData();

    fetchEvents();
  }, []);

  return (
    <EventContext.Provider value={{ events, eventSummary }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within an EventProvider");
  }
  return context;
};
