import React from "react";
import { EventData } from "../types";

const fallbackImage = "/images/logo.png";

interface EventCardProps {
  event: EventData;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:scale-105 transition-transform duration-200">
    <img
      src={event.imageUrl || fallbackImage}
      alt={event.title}
      className="w-full h-48 object-cover"
      onError={e => (e.currentTarget.src = fallbackImage)}
    />
    <div className="p-4 flex flex-col flex-1">
      <h3 className="text-xl font-bold mb-1 text-blue-800">{event.title}</h3>
      <p className="text-gray-500 text-sm mb-2">{event.date} | {event.location}</p>
      <p className="text-gray-700 flex-1 mb-2">{event.description}</p>
    </div>
  </div>
);

export default EventCard;
