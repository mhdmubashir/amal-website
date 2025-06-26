import React, { useEffect, useState } from "react";
import { studentAchievementService } from "../services/student-achievement/studentAchievement_service";
import { StudentAchievement } from "../types";
import StudentAchievementCard from "../components/StudentAchievementCard";
import CustomLoader from "../components/CustomLoader";

const StudentAchievementsPage: React.FC = () => {
  const [achievements, setAchievements] = useState<StudentAchievement[]>([]);
  const [selected, setSelected] = useState<StudentAchievement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentAchievementService.getStudentAchievements()
      .then(data => {
        setAchievements(data);
        if (data.length > 0) setSelected(data[0]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CustomLoader />;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Student Achievements</h1>
      <div className="flex flex-col md:flex-row max-w-5xl mx-auto gap-8">
        <div className="md:w-1/4 flex flex-col gap-2">
          {achievements.map((item, idx) => (
            <button
              key={item.id}
              className={`text-left px-4 py-2 rounded ${selected?.id === item.id ? "bg-blue-600 text-white" : "bg-white text-gray-800"} shadow`}
              onClick={() => setSelected(item)}
            >
              <div className="font-semibold">{item.title}</div>
              <div className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</div>
            </button>
          ))}
        </div>
        <div className="md:w-3/4">
          {selected && <StudentAchievementCard achievement={selected} />}
        </div>
      </div>
    </div>
  );
};

export default StudentAchievementsPage;
