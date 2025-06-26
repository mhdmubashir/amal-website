import React, { useEffect, useState } from "react";
import CustomLoader from "../components/CustomLoader";
import Footer from "../components/Footer";
import Header from "../components/Header";
import StaffAchievementCard from "../components/StaffAchievementCard";
import { useTheme } from "../context/ThemeContext";
import { staffAchievementService } from "../services/staff-achievement/staffAchievement_service";
import { CollegeData, StaffAchievement } from "../types";

const StaffAchievementsPage: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [achievements, setAchievements] = useState<StaffAchievement[]>([]);
    const [selected, setSelected] = useState<StaffAchievement | null>(null);
    const [loading, setLoading] = useState(true);
    const [collegeData, setCollegeData] = useState<CollegeData | null>(null);

    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(json => setCollegeData(json));
    }, []);

    useEffect(() => {
        staffAchievementService.getStaffAchievements()
            .then(data => {
                setAchievements(data);
                if (data.length > 0) setSelected(data[0]);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading || !collegeData) return <CustomLoader />;

    return (
        <>
            <Header
                theme={theme}
                toggleTheme={toggleTheme}
                collegeName={collegeData.collegeName}
                logo={collegeData.footer.logo}
            />
            <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-10 px-2 sm:px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center mb-6">
                        <button
                            onClick={() => window.history.back()}
                            className="mr-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        >
                            &larr; Back
                        </button>
                        <h1 className="text-3xl font-bold text-green-900">Staff Achievements</h1>
                    </div>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/4 w-full flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible">
                            {achievements.map((item) => (
                                <button
                                    key={item.id}
                                    className={`min-w-[180px] md:min-w-0 text-left px-4 py-3 rounded-lg shadow transition font-medium ${selected?.id === item.id
                                            ? "bg-green-600 text-white scale-105"
                                            : "bg-white text-gray-800 hover:bg-green-100"
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
                                    <StaffAchievementCard achievement={selected} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer theme={theme} footerData={collegeData.footer} />
        </>
    );
};

export default StaffAchievementsPage;
