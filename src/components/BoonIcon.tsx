import React from 'react';
import { getArtifactIcon } from './artifactRegistry';

interface BoonIconProps {
  iconName?: string;
  upgradeId?: string;
  className?: string;
}

export const BoonIcon: React.FC<BoonIconProps> = ({ upgradeId, className = 'w-10 h-10' }) => {
  if (upgradeId) {
    const icon = getArtifactIcon(upgradeId);
    if (icon) {
      return (
        <svg
          className={className}
          viewBox={icon.viewBox}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          dangerouslySetInnerHTML={{ __html: icon.svg }}
        />
      );
    }
  }

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l3 7h7l-5.5 4.5 2 7L12 17l-6.5 3.5 2-7L2 9h7z" className="stroke-amber-400 fill-amber-500/15" />
    </svg>
  );
};