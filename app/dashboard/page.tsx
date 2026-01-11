"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import DashboardHeader from "@/components/DashboardHeader";
import PortfolioChart from "@/components/PortfolioChart";
import QuickActionsCard from "@/components/QuickActionsCard";
import ListRow from "@/components/ListRow";
import BottomNav from "@/components/BottomNav";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/contexts/AuthContext";

// Portfolio data - in a real app, this would come from an API
const portfolioData = {
  totalValue: "13,36",
  currency: "€",
  change: "-1,69%",
  changePeriod: "in 1 Tag",
};

// Quick actions data
const quickActions = [
  {
    title: "Verfügbares Guthaben",
    value: "0,00 €",
    subtitle: "Guthaben auf Wallets & Orders",
  },
  {
    title: "Gratis einzahlen",
    value: "Jetzt starten →",
    subtitle: "",
    tag: "EUR · SEPA",
    accent: true,
    href: "/dashboard/deposit",
  },
  {
    title: "Trading-Gebühren",
    value: "-20%",
    subtitle: "mit BEST VIP Level",
  },
  {
    title: "Staking Rewards",
    value: "bis 30%",
    subtitle: "für ausgewählte Assets",
  },
];

// Allocation data
const allocationData = [
  {
    icon: "pie" as const,
    name: "Krypto",
    label: "BTC, ETH, mehr",
    amount: "100%",
    pill: "13,36 €",
  },
];

// Top positions data
const topPositions = [
  {
    icon: "btc" as const,
    name: "Bitcoin",
    label: "BTC · Spot",
    amount: "0,0000 BTC",
    pill: "-1,2%",
    negative: true,
  },
  {
    icon: "eth" as const,
    name: "Ethereum",
    label: "ETH · Spot",
    amount: "0,0000 ETH",
    pill: "0,0%",
    negative: false,
  },
];

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const { theme } = useTheme();
  const [isClient, setIsClient] = React.useState(false);
  const [activeRange, setActiveRange] = React.useState("1D");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Get user's display name from email or user metadata
  // Must be called unconditionally at top level (React hooks rule)
  const userName = React.useMemo(() => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.email) {
      return user.email.split("@")[0];
    }
    return "User";
  }, [user]);

  // Handle hydration mismatch by rendering loading state until mounted
  if (!isClient || loading) {
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
        <DashboardHeader userName={userName} />

        {/* PORTFOLIO CARD */}
        <section className="portfolio">
          <div className="portfolio-inner">
            <small>Gesamtwert</small>

            <div className="value-row">
              <div>
                <div className="value">
                  {portfolioData.totalValue}
                  <span className="value-currency">{portfolioData.currency}</span>
                </div>
              </div>

              <div className="value-detail">
                <div className="value-label">Heute</div>
                <div className="change">
                  ▼ {portfolioData.change}
                  <span>in {portfolioData.changePeriod}</span>
                </div>
              </div>
            </div>

            {/* CHART */}
            <PortfolioChart
              activeRange={activeRange}
              onRangeChange={setActiveRange}
            />
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <h3 className="section-title">Aktionen</h3>
        <section className="cards">
          {quickActions.map((action, index) => (
            <QuickActionsCard
              key={index}
              title={action.title}
              value={action.value}
              subtitle={action.subtitle}
              tag={action.tag}
              accent={action.accent}
              href={action.href}
            />
          ))}
        </section>

        {/* ALLOCATION */}
        <h3 className="section-title">Allokation</h3>
        <section className="list-card">
          {allocationData.map((item, index) => (
            <ListRow
              key={index}
              icon={item.icon}
              name={item.name}
              label={item.label}
              amount={item.amount}
              pill={item.pill}
            />
          ))}
        </section>

        {/* TOP POSITIONEN */}
        <h3 className="section-title">Top Positionen</h3>
        <section className="list-card">
          {topPositions.map((item, index) => (
            <ListRow
              key={index}
              icon={item.icon}
              name={item.name}
              label={item.label}
              amount={item.amount}
              pill={item.pill}
              negative={item.negative}
            />
          ))}
        </section>

        {/* RECENT ACTIVITY */}
        <h3 className="section-title">Letzte Aktivität</h3>
        <section className="list-card">
          <ListRow
            icon="circle"
            name="Keine Trades"
            label="Hier erscheinen deine letzten Aktivitäten"
            amount=""
            pill="Live"
          />
        </section>
      </div>

      {/* SIDEBAR */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* BOTTOM NAVIGATION */}
      <BottomNav 
        onMenuClick={() => setIsSidebarOpen(true)} 
        isMenuActive={isSidebarOpen} 
      />
    </div>
  );
}

