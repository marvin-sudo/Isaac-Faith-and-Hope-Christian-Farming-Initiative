import React from 'react';
import { AceHubPage } from './AceHubPage';

interface CombatCenterPageProps {
  onNavigate: (page: string) => void;
  onOpenDocModal: () => void;
}

export const CombatCenterPage: React.FC<CombatCenterPageProps> = (props) => {
  return <AceHubPage {...props} />;
};

