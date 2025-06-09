import React from 'react';
import { Theme } from '../styles/theme';
import { Profile } from '../types';

interface ProfileCardProps {
  profile: Profile;
  theme: Theme;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, theme }) => {
  return (
    <div className={`${theme.card} p-4 rounded-lg shadow-md text-center`}>
      <img src={profile.image} alt={profile.name} className="w-24 h-24 rounded-full mx-auto mb-2" />
      <h3 className={`font-semibold ${theme.text}`}>{profile.name}</h3>
      <p className={theme.text}>{profile.designation}</p>
    </div>
  );
};

export default ProfileCard;