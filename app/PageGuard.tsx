'use client';

import React, { useEffect } from 'react';
import { useSecurity } from './SecurityContext';
import { useRouter, usePathname } from 'next/navigation';

interface PageGuardProps {
  children: React.ReactNode;
  allowedRoles?: ('ADMIN' | 'MANAGER' | 'USER' | 'GUEST')[];
}

export default function PageGuard({ children, allowedRoles }: PageGuardProps) {
  const { userProfile, loading } = useSecurity();
  const router = useRouter();
  const pathname = usePathname();

  // Extract the active runtime clearance role safely
  const activeRole = userProfile?.role || 'GUEST';

  useEffect(() => {
    // ⚠️ STOPS THE REFRESH KICK: If the background API check is still running, do absolutely nothing!
    if (loading) return;

    // If the network request finished but context hasn't filled the profile state yet, wait.
    if (!userProfile) return;

    const isGuestSessionAllowed = typeof window !== 'undefined' && sessionStorage.getItem('wolf_guest_allowed') === 'true';
    const isUserLoggedIn = userProfile && userProfile.id !== null && userProfile.role !== 'GUEST';

    // Prevent redirection loop if the user is already standing on the login page
    if (pathname === '/login') return;

    // Rule 1: Forced login execution for first-time entries who are not authorized users or verified guests
    if (!isUserLoggedIn && !isGuestSessionAllowed) {
      router.replace('/login');
      return;
    }

    // Rule 2: Role boundary rule: A cleared guest tries to access an explicit restriction zone (e.g., /admin-hub)
    if (activeRole === 'GUEST' && allowedRoles && !allowedRoles.includes('GUEST')) {
      router.replace('/login');
    }
  }, [activeRole, loading, allowedRoles, userProfile, router, pathname]);

  // Keep rendering layout suspended while the network handshake completes
  if (loading || !userProfile) {
    return (
      <div style={{ minHeight: '100vh', background: '#09090b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a1a1aa', fontFamily: 'system-ui, sans-serif', fontSize: '13px' }}>
        Authenticating structural system parameters...
      </div>
    );
  }

  // If the user is a guest trying to access an authorized zone, prevent page layout flashing
  if (activeRole === 'GUEST' && allowedRoles && !allowedRoles.includes('GUEST')) {
    return null;
  }

  // Intercept clearance role mismatches for signed-in users (e.g., USER trying to view ADMIN path)
  if (allowedRoles && !allowedRoles.includes(activeRole)) {
    return (
      <div style={{ minHeight: '100vh', background: '#09090b', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', padding: '1rem' }}>
        <div style={{ width: '100%', maxWidth: '420px', background: '#18181b', border: '1px solid #7f1d1d', borderRadius: '12px', padding: '2rem', boxSizing: 'border-box', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
          <h1 style={{ color: '#ef4444', fontSize: '16px', fontWeight: '600', margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Security Clearance Violation
          </h1>
          <p style={{ color: '#a1a1aa', fontSize: '13px', margin: 0, lineHeight: '1.5' }}>
            Your signed-in account profile level ({activeRole}) does not possess the structural authorization keys required to execute this matrix segment.
          </p>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '10px' }}>
            <button
              onClick={() => router.push('/login')}
              style={{ padding: '8px 14px', background: '#f4f4f5', color: '#09090b', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
            >
              Switch Account
            </button>
            <button
              onClick={() => router.push('/')}
              style={{ padding: '8px 14px', background: 'transparent', color: '#a1a1aa', border: '1px solid #27272a', borderRadius: '6px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}
            >
              Return to Welcome
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
