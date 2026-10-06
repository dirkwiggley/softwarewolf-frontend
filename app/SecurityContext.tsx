'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface UserSessionProfile {
  id: string | null;
  username: string | null;
  displayName: string;
  email: string | null;
  role: 'ADMIN' | 'MANAGER' | 'USER' | 'GUEST';
}

interface SecurityContextType {
  activeUserId: string | null;
  userProfile: UserSessionProfile | null;
  loading: boolean;
  theme: 'light' | 'dark';
  loginUser: (username: string, password: string) => Promise<boolean>;
  logoutUser: () => Promise<void>;
  toggleTheme: () => void;
  updateUserProfile: (profile: Partial<UserSessionProfile>) => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export const SecurityProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserSessionProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [hydrated, setHydrated] = useState(false);

  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.softwarewolf.org';

  // 1. Read layout preference cleanly from cookies on client-side component mount
  useEffect(() => {
    const match = document.cookie.match(new RegExp('(^| )wolf_theme=([^;]+)'));
    const savedTheme = match ? (match[2] as 'light' | 'dark') : null;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
    setHydrated(true);
  }, []);

  // 2. Watch theme changes and apply class to documentElement for Tailwind v4
  useEffect(() => {
    if (!hydrated) return;

    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    document.cookie = `wolf_theme=${theme}; path=/; max-age=31536000; SameSite=Lax`;
  }, [theme, hydrated]);

  // Background identity check on component initialization
  useEffect(() => {
    const verifyIdentitySession = async () => {
      try {
        const tabVerified = sessionStorage.getItem('wolf_tab_session_active');

        if (!tabVerified) {
          sessionStorage.clear();
        }

        // FIX: Added credentials 'include' to ensure cross-domain session cookies pass successfully
        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
          credentials: 'include'
        });

        if (response.ok) {
          const profile: UserSessionProfile = await response.json();

          if (profile.role === 'GUEST') {
            throw new Error('Server session expired');
          }

          setActiveUserId(profile.id);
          setUserProfile(profile);
          sessionStorage.setItem('wolf_tab_session_active', 'true');
        } else {
          setActiveUserId(null);
          setUserProfile({ id: null, username: null, displayName: 'Anonymous Guest', email: null, role: 'GUEST' });
        }
      } catch (error) {
        setActiveUserId(null);
        setUserProfile({ id: null, username: null, displayName: 'Anonymous Guest', email: null, role: 'GUEST' });
        sessionStorage.removeItem('wolf_tab_session_active');
      } finally {
        setLoading(false);
      }
    };

    verifyIdentitySession();
  }, [API_BASE_URL]);

  const loginUser = async (username: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const profile: UserSessionProfile = await response.json();
        setActiveUserId(profile.id);
        setUserProfile(profile);
        router.push('/');
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const logoutUser = async () => {
    try {
      // FIX: Added credentials 'include' so the backend knows whose session cookie to invalidate
      await fetch(`${API_BASE_URL}/api/auth/logout`, { 
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout sync error:', error);
    } finally {
      setActiveUserId(null);
      setUserProfile({
        id: null,
        username: null,
        displayName: 'Anonymous Guest',
        email: null,
        role: 'GUEST'
      });
      router.push('/login');
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const updateUserProfile = (updatedFields: Partial<UserSessionProfile>) => {
    setUserProfile((prev) => {
      if (!prev) return null;
      return { ...prev, ...updatedFields };
    });
  };

  return (
    <SecurityContext.Provider value={{ activeUserId, userProfile, loading, theme, loginUser, logoutUser, toggleTheme, updateUserProfile }}>
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be encapsulated inside a valid SecurityProvider framework');
  }
  return context;
};
