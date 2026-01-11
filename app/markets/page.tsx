"use client";

import * as React from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";

// Mock market data
const marketData = [
  { id: "btc", name: "Bitcoin", symbol: "BTC", price: "43,250.00", change: "+2.45%", marketCap: "842B", volume: "28.4B", graph: "up" },
  { id: "eth", name: "Ethereum", symbol: "ETH", price: "2,280.50", change: "+1.82%", marketCap: "274B", volume: "12.1B", graph: "up" },
  { id: "bnb", name: "Binance Coin", symbol: "BNB", price: "312.40", change: "-0.54%", marketCap: "48.2B", volume: "1.4B", graph: "down" },
  { id: "sol", name: "Solana", symbol: "SOL", price: "98.75", change: "+4.21%", marketCap: "42.1B", volume: "3.8B", graph: "up" },
  { id: "xrp", name: "Ripple", symbol: "XRP", price: "0.62", change: "+0.89%", marketCap: "33.8B", volume: "1.2B", graph: "up" },
  { id: "ada", name: "Cardano", symbol: "ADA", price: "0.52", change: "-1.23%", marketCap: "18.2B", volume: "456M", graph: "down" },
  { id: "doge", name: "Dogecoin", symbol: "DOGE", price: "0.082", change: "+5.67%", marketCap: "11.8B", volume: "2.1B", graph: "up" },
  { id: "dot", name: "Polkadot", symbol: "DOT", price: "7.85", change: "-2.34%", marketCap: "10.2B", volume: "234M", graph: "down" },
];

// Market categories
const categories = ["All", "Trending", "Gainers", "Losers", "DeFi", "Metaverse"];

export default function MarketsPage() {
  const [isClient, setIsClient] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState("All");
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const filteredMarkets = marketData.filter((market) => {
    const matchesSearch = market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      market.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

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
            <span className="header-eyebrow">MARKETS</span>
            <div className="header-title">Markets</div>
          </div>
          <button className="sync-btn" onClick={() => setIsSidebarOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </header>

        {/* MARKET STATS */}
        <section className="market-stats">
          <div className="stats-row">
            <div className="stat-card">
              <span className="stat-label">Total Market Cap</span>
              <span className="stat-value">2.42T</span>
              <span className="stat-change positive">+1.8%</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">24h Volume</span>
              <span className="stat-value">78.5B</span>
              <span className="stat-change negative">-2.3%</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">BTC Dominance</span>
              <span className="stat-value">52.1%</span>
              <span className="stat-change negative">-0.2%</span>
            </div>
          </div>
        </section>

        {/* SEARCH */}
        <div className="market-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search coins..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* CATEGORIES */}
        <div className="market-categories">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-chip ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* MARKET LIST */}
        <section className="market-list">
          <div className="market-list-header">
            <span>Asset</span>
            <span>Price</span>
            <span>24h</span>
            <span>Market Cap</span>
          </div>
          <div className="market-list-body">
            {filteredMarkets.map((market) => (
              <div key={market.id} className="market-row">
                <div className="market-asset">
                  <div className="asset-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                  </div>
                  <div className="asset-info">
                    <span className="asset-name">{market.name}</span>
                    <span className="asset-symbol">{market.symbol}</span>
                  </div>
                </div>
                <div className="market-price">
                  <span className="price-value">{market.price}</span>
                  <span className="price-currency">EUR</span>
                </div>
                <div className={`market-change ${market.change.startsWith("+") ? "positive" : "negative"}`}>
                  {market.change}
                </div>
                <div className="market-cap">
                  <span className="cap-value">{market.marketCap}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TRENDING SECTION */}
        <section className="trending-section">
          <h3 className="section-title">Trending</h3>
          <div className="trending-list">
            <div className="trending-item">
              <div className="trending-icon up">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
              <div className="trending-info">
                <span className="trending-name">Top Gainer</span>
                <span className="trending-value">SOL +4.21%</span>
              </div>
            </div>
            <div className="trending-item">
              <div className="trending-icon down">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                  <polyline points="17 18 23 18 23 12" />
                </svg>
              </div>
              <div className="trending-info">
                <span className="trending-name">Top Loser</span>
                <span className="trending-value">DOT -2.34%</span>
              </div>
            </div>
            <div className="trending-item">
              <div className="trending-icon volume">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div className="trending-info">
                <span className="trending-name">Highest Volume</span>
                <span className="trending-value">BTC 28.4B</span>
              </div>
            </div>
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

