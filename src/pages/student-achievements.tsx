import React, { useEffect, useState } from "react";
import CustomLoader from "../components/CustomLoader";
import Footer from "../components/Footer";
import Header from "../components/Header";
import StudentAchievementCard from "../components/StudentAchievementCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { useTheme } from "../context/ThemeContext";
import { studentAchievementService } from "../services/student-achievement/studentAchievement_service";
import { CollegeData, StudentAchievement } from "../types";

const StudentAchievementsPage: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [achievements, setAchievements] = useState<StudentAchievement[]>([]);
    const [selected, setSelected] = useState<StudentAchievement | null>(null);
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
        studentAchievementService.getStudentAchievements({ page, limit: 10, search })
            .then(data => {
                setAchievements(data.items);
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
            <main className="min-h-screen bg-gradient-to-br from-yellow-50 to-pink-100 py-10 px-2 sm:px-4">
                <div className="max-w-6xl mx-auto">
                    <SearchBar value={search} onChange={setSearch} placeholder="Search student achievements..." />
                    <div className="flex items-center mb-6">
                        <button
                            onClick={() => window.history.back()}
                            className="mr-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                        >
                            &larr; Back
                        </button>
                        <h1 className="text-3xl font-bold text-yellow-700">Student Achievements</h1>
                    </div>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/4 w-full flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible">
                            {achievements.map((item) => (
                                <button
                                    key={item.id}
                                    className={`min-w-[180px] md:min-w-0 text-left px-4 py-3 rounded-lg shadow transition font-medium ${selected?.id === item.id
                                            ? "bg-yellow-500 text-white scale-105"
                                            : "bg-white text-gray-800 hover:bg-yellow-100"
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
                                    <StudentAchievementCard achievement={selected} />
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

export default StudentAchievementsPage;
