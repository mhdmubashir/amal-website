import React from 'react';
import { Theme } from '../styles/theme';
import { Highlight } from '../types';

interface HighlightCardProps {
  highlight: Highlight;
  theme: Theme;
}

const HighlightCard: React.FC<HighlightCardProps> = ({ highlight, theme }) => {
  return (
    <div className={`${theme.card} p-4 rounded-lg shadow-md text-center`}>
      <h3 className={`font-semibold ${theme.text}`}>{highlight.title}</h3>
      <p className={theme.text}>{highlight.description}</p>
    </div>
  );
};

export default HighlightCard;