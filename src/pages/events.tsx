import React, { useEffect, useState } from "react";
import CustomLoader from "../components/CustomLoader";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { useTheme } from "../context/ThemeContext";
import { eventService } from "../services/event/event_service";
import { CollegeData, EventData } from "../types";

const EventsPage: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [events, setEvents] = useState<EventData[]>([]);
    const [selected, setSelected] = useState<EventData | null>(null);
    const [loading, setLoading] = useState(true);
    const [collegeData, setCollegeData] = useState<CollegeData | null>(null);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(json => setCollegeData(json));
    }, []);

    useEffect(() => {
        eventService.getEvents({ page, limit: 10, search })
            .then(data => {
                setEvents(data.items);
                setTotalPages(data.totalPages);
                setSelected(data.items[0] || null);
            })
            .finally(() => setLoading(false));
    }, [page, search]);

    if (loading || !collegeData) return <CustomLoader />;

    return (
        <>
            <Header
                theme={theme}
                toggleTheme={toggleTheme}
                collegeName={collegeData.collegeName}
                logo={collegeData.footer.logo}
            />
            <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 py-10 px-2 sm:px-4">
                <div className="max-w-6xl mx-auto">
                    <SearchBar value={search} onChange={setSearch} placeholder="Search events..." />
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
                        <div className="md:w-1/4 w-full flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible">
                            {events.map((item) => (
                                <button
                                    key={item.id}
                                    className={`min-w-[180px] md:min-w-0 text-left px-4 py-3 rounded-lg shadow transition font-medium ${selected?.id === item.id
                                            ? "bg-blue-600 text-white scale-105"
                                            : "bg-white text-gray-800 hover:bg-blue-100"
                                        }`}
                                    onClick={() => setSelected(item)}
                                >
                                    <div className="font-semibold truncate">{item.title}</div>
                                    <div className="text-xs font-medium text-gray-600 mt-1">
                                        {item.createdAt
                                            ? new Date(item.createdAt).toLocaleDateString("en-IN", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric"
                                            })
                                            : ""}
                                    </div>
                                </button>
                            ))}
                        </div>
                        <div className="md:w-3/4 w-full">
                            {selected && (
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <EventCard event={selected} />
                                </div>
                            )}
                        </div>
                    </div>
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                </div>
            </main>
            <Footer theme={theme} footerData={collegeData.footer} />
        </>
    );
};

export default EventsPage;
