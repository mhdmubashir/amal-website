import React from "react";
import { apiBaseForImage } from "services/const_service";
import { StaffAchievement } from "../types";

interface StaffAchievementCardProps {
    achievement: StaffAchievement;
    onClick?: () => void;
}

const StaffAchievementCard: React.FC<StaffAchievementCardProps> = ({ achievement, onClick }) => (
    <div
        className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:scale-105 transition-transform duration-200 cursor-pointer"
        onClick={onClick}
    >
        <img
            src={apiBaseForImage + achievement.imageUrl}
            alt={achievement.title}
            className="w-full h-48 object-cover"
            onError={e => (e.currentTarget.src = "/images/logo.png")}
        />
        <div className="p-4 flex flex-col flex-1">
            <h3 className="text-xl font-bold mb-1 text-blue-800">{achievement.title}</h3>
            <p className="text-gray-700 flex-1 mb-2">{achievement.description}</p>
        </div>
    </div>
);

export default StaffAchievementCard;
