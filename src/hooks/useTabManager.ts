import { useState } from 'react';

export type StartScreenTab = 'setup' | 'settings';

export interface TabManager<T extends string> {
  activeTab: T;
  setActiveTab: (tab: T) => void;
  isActive: (tab: T) => boolean;
}

export function useTabManager<T extends string>(initial: T): TabManager<T> {
  const [activeTab, setActiveTab] = useState<T>(initial);
  return {
    activeTab,
    setActiveTab,
    isActive: (tab: T) => tab === activeTab,
  };
}