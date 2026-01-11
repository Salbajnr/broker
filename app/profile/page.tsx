"use client";

import * as React from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

interface ListItemProps {
  label: string;
  value?: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  danger?: boolean;
}

function ListItem({ label, value, icon, href, onClick, danger }: ListItemProps) {
  const content = (
    <>
      <div className="list-item-left">
        {icon && <div className="list-item-icon">{icon}</div>}
        <span className={danger ? "text-danger" : ""}>{label}</span>
      </div>
      <div className="list-item-right">
        {value && <span className="list-item-value">{value}</span>}
        {href && (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        )}
      </div>
    </>
  );

  if (href) {
    return <Link href={href} className="list-item">{content}</Link>;
  }

  if (onClick) {
    return <button className="list-item list-button" onClick={onClick}>{content}</button>;
  }

  return <div className="list-item">{content}</div>;
}

// Mock user data - in real app this comes from auth context
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+43 123 456789",
  kycStatus: "pending" as "pending" | "verified",
  memberSince: "January 2024",
  accountType: "Personal",
};

export default function ProfilePage() {
  const [isClient, setIsClient] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [user, setUser] = React.useState(mockUser);

  React.useEffect(() => {
    setIsClient(true);
    // Simulate fetching user data
    setUser({
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+43 123 456789",
      kycStatus: "verified", // Change to "pending" to test unverified state
      memberSince: "January 2024",
      accountType: "Personal",
    });
  }, []);

  if (!isClient) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-app">
        {/* HEADER */}
        <header className="header">
          <div className="header-left">
            <Link href="/dashboard" className="header-back">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </Link>
            <span className="header-eyebrow">ACCOUNT</span>
            <div className="header-title">Profile</div>
          </div>
          <button className="sync-btn" onClick={() => setIsSidebarOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </header>

        {/* PROFILE CARD */}
        <section className="profile-card">
          <div className="profile-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-email">{user.email}</p>
            <div className="profile-meta">
              <span>Member since {user.memberSince}</span>
              <span className="dot">•</span>
              <span>{user.accountType}</span>
            </div>
          </div>
        </section>

        {/* KYC SECTION */}
        <section className="kyc-section">
          <h3 className="section-title">Identity Verification</h3>
          <div className="kyc-card">
            {user.kycStatus === "verified" ? (
              <div className="kyc-verified">
                <div className="kyc-icon verified">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div className="kyc-info">
                  <span className="kyc-status">Verified</span>
                  <p>Your identity has been verified. You have full access to all platform features.</p>
                </div>
              </div>
            ) : (
              <div className="kyc-pending">
                <div className="kyc-icon pending">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <div className="kyc-info">
                  <span className="kyc-status">Verification Required</span>
                  <p>Complete your identity verification to unlock all features.</p>
                </div>
                <button className="kyc-button">
                  Verify KYC
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* PERSONAL INFO */}
        <section className="info-section">
          <h3 className="section-title">Personal Information</h3>
          <div className="list-card">
            <ListItem
              label="Full Name"
              value={user.name}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              }
            />
            <ListItem
              label="Email"
              value={user.email}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              }
            />
            <ListItem
              label="Phone"
              value={user.phone}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              }
            />
          </div>
        </section>

        {/* ACCOUNT SETTINGS */}
        <section className="info-section">
          <h3 className="section-title">Account Settings</h3>
          <div className="list-card">
            <ListItem
              label="Security"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              }
              href="/settings#security"
            />
            <ListItem
              label="Preferences"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              }
              href="/settings#preferences"
            />
            <ListItem
              label="Two-Factor Authentication"
              value="Enabled"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              }
              href="/settings#2fa"
            />
          </div>
        </section>
      </div>

      <BottomNav 
        onMenuClick={() => setIsSidebarOpen(true)} 
        isMenuActive={isSidebarOpen} 
      />
    </div>
  );
}

