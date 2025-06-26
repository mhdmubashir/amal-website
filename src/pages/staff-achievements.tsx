import React, { useEffect, useState } from "react";
import { staffAchievementService } from "../services/staff-achievement/staffAchievement_service";
import { StaffAchievement } from "../types";
import StaffAchievementCard from "../components/StaffAchievementCard";
import CustomLoader from "../components/CustomLoader";

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
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Staff Achievements</h1>
      <div className="flex flex-col md:flex-row max-w-5xl mx-auto gap-8">
        <div className="md:w-1/4 flex flex-col gap-2">
          {achievements.map((item, idx) => (
            <button
              key={item.id}
              className={`text-left px-4 py-2 rounded ${selected?.id === item.id ? "bg-blue-600 text-white" : "bg-white text-gray-800"} shadow`}
              onClick={() => setSelected(item)}
            >
              <div className="font-semibold">{item.title}</div>
              <div className="text-xs text-gray-500">{item.staffName}</div>
            </button>
          ))}
        </div>
        <div className="md:w-3/4">
          {selected && <StaffAchievementCard achievement={selected} />}
        </div>
      </div>
    </div>
  );
};

export default StaffAchievementsPage;
