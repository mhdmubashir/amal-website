import React, { useEffect, useState } from "react";
import { eventService } from "../services/event/event_service";
import { EventData } from "../types";
import EventCard from "../components/EventCard";
import CustomLoader from "../components/CustomLoader";

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [selected, setSelected] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    eventService.getEvents()
      .then(data => {
        setEvents(data);
        if (data.length > 0) setSelected(data[0]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CustomLoader />;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Events</h1>
      <div className="flex flex-col md:flex-row max-w-5xl mx-auto gap-8">
        <div className="md:w-1/4 flex flex-col gap-2">
          {events.map((item, idx) => (
            <button
              key={item.id}
              className={`text-left px-4 py-2 rounded ${selected?.id === item.id ? "bg-blue-600 text-white" : "bg-white text-gray-800"} shadow`}
              onClick={() => setSelected(item)}
            >
              <div className="font-semibold">{item.title}</div>
              <div className="text-xs text-gray-500">{item.date}</div>
            </button>
          ))}
        </div>
        <div className="md:w-3/4">
          {selected && <EventCard event={selected} />}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
