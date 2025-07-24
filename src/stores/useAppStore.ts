import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  thaiId: string;
  phone: string;
  address: string;
}

interface AppStore {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // UI state
  language: 'th' | 'en';
  isDarkMode: boolean;
  
  // App state
  isOnline: boolean;
  lastSync: Date | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setLanguage: (language: 'th' | 'en') => void;
  toggleDarkMode: () => void;
  setOnlineStatus: (status: boolean) => void;
  updateLastSync: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      language: 'th',
      isDarkMode: false,
      isOnline: true,
      lastSync: null,
      
      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLanguage: (language) => set({ language }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setOnlineStatus: (isOnline) => set({ isOnline }),
      updateLastSync: () => set({ lastSync: new Date() }),
    }),
    {
      name: 'localgov-app-store',
      partialize: (state) => ({
        language: state.language,
        isDarkMode: state.isDarkMode,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);