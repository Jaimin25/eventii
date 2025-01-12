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
  House_Number: string;
  Street_Name: string;
  Landmark: string;
  Locality: string;
  City: string;
  State: string;
  Postal_Code: string;
  Start_Time: string;
  Event_Type: string;
}

interface EventSummaryType {
  totalEvents: number;
  totalParticipants: number;
}

// Define the shape of the context
interface EventContextType {
  events: EventType[] | string;
  eventSummary: EventSummaryType | undefined;
  setEvents: React.Dispatch<React.SetStateAction<EventType[] | string>>;
  setEventSummary: React.Dispatch<
    React.SetStateAction<EventSummaryType | undefined>
  >;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<EventType[] | string>("");
  const [eventSummary, setEventSummary] = useState<EventSummaryType>();

  useEffect(() => {
    async function fetchEvents() {
      try {
        setEvents("loading");
        const res = await fetch("/api/events/getEvents");
        const data = await res.json();
        if (data.status === 200) {
          data.message.sort((a: EventType, b: EventType) => {
            // Compare Dates
            const dateA = new Date(a.Date).getTime();
            const dateB = new Date(b.Date).getTime();

            if (dateA !== dateB) {
              return dateA - dateB; // Sort by Date if they are different
            }

            // If Dates are the same, compare Start_Time
            const timeA = new Date(`${a.Start_Time}`).getTime();
            const timeB = new Date(`${b.Start_Time}`).getTime();

            return timeA - timeB; // Sort by Start_Time if Dates are the same
          });

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
        const res = await fetch("/api/events/getSummary");
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
    <EventContext.Provider
      value={{ events, eventSummary, setEvents, setEventSummary }}
    >
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
