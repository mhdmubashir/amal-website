import React, { useState, useEffect } from 'react';
import { Theme } from '../styles/theme';

interface AnnouncementSliderProps {
  theme: Theme;
  announcements: string[];
}

const AnnouncementSlider: React.FC<AnnouncementSliderProps> = ({ theme, announcements }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [announcements]);

  return (
    <div className="overflow-hidden bg-yellow-100 py-2">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {announcements.map((announcement, index) => (
          <div key={index} className="min-w-full text-center text-gray-800">
            {announcement}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementSlider;