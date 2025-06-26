import React, { useEffect, useState } from "react";
import CustomLoader from "../components/CustomLoader";
import StaffAchievementCard from "../components/StaffAchievementCard";
import { staffAchievementService } from "../services/staff-achievement/staffAchievement_service";
import { StaffAchievement } from "../types";

const StaffAchievementsPage: React.FC = () => {
    const [achievements, setAchievements] = useState<StaffAchievement[]>([]);
    const [selected, setSelected] = useState<StaffAchievement | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        staffAchievementService.getStaffAchievements()
            .then(data => {
                setAchievements(data);
                if (data.length > 0) setSelected(data[0]);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <CustomLoader />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-10 px-4">
            <div className="max-w-5xl mx-auto">
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
                    <div className="md:w-1/4 flex flex-col gap-2">
                        {achievements.map((item, idx) => (
                            <button
                                key={item.id}
                                className={`text-left px-4 py-3 rounded-lg shadow transition font-medium ${selected?.id === item.id
                                        ? "bg-green-600 text-white scale-105"
                                        : "bg-white text-gray-800 hover:bg-green-100"
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
                                <StaffAchievementCard achievement={selected} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffAchievementsPage;
