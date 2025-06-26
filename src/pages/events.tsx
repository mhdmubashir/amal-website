import React, { useEffect, useState } from "react";
import CustomLoader from "../components/CustomLoader";
import EventCard from "../components/EventCard";
import { eventService } from "../services/event/event_service";
import { EventData } from "../types";

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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 py-10 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center mb-6">
                    <button
                        onClick={() => window.history.back()}
                        className="mr-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        &larr; Back
                    </button>
                    <h1 className="text-3xl font-bold text-blue-900">Events</h1>
                </div>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/4 flex flex-col gap-2">
                        {events.map((item, idx) => (
                            <button
                                key={item.id}
                                className={`text-left px-4 py-3 rounded-lg shadow transition font-medium ${selected?.id === item.id
                                        ? "bg-blue-600 text-white scale-105"
                                        : "bg-white text-gray-800 hover:bg-blue-100"
                                    }`}
                                onClick={() => setSelected(item)}
                            >
                                <div className="font-semibold truncate">{item.title}</div>
                                <div className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</div>
                            </button>
                        ))}
                    </div>
                    <div className="md:w-3/4">
                        {selected && (
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <EventCard event={selected} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventsPage;
