"use client";

import * as React from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";

// Mock data for trading pairs
const tradingPairs = [
  { id: "btc-eur", name: "BTC/EUR", price: "43,250.00", change: "+2.45%", volume: "2.4B" },
  { id: "eth-eur", name: "ETH/EUR", price: "2,280.50", change: "+1.82%", volume: "1.1B" },
  { id: "bnb-eur", name: "BNB/EUR", price: "312.40", change: "-0.54%", volume: "145M" },
  { id: "sol-eur", name: "SOL/EUR", price: "98.75", change: "+4.21%", volume: "890M" },
  { id: "xrp-eur", name: "XRP/EUR", price: "0.62", change: "+0.89%", volume: "456M" },
  { id: "ada-eur", name: "ADA/EUR", price: "0.52", change: "-1.23%", volume: "234M" },
];

// Mock data for order book
const orderBook = {
  bids: [
    { price: "43,245.00", amount: "2.5", total: "108,112.50" },
    { price: "43,240.00", amount: "1.8", total: "77,832.00" },
    { price: "43,235.00", amount: "3.2", total: "138,352.00" },
    { price: "43,230.00", amount: "0.9", total: "38,907.00" },
    { price: "43,225.00", amount: "4.5", total: "194,512.50" },
  ],
  asks: [
    { price: "43,255.00", amount: "1.2", total: "51,906.00" },
    { price: "43,260.00", amount: "2.8", total: "121,128.00" },
    { price: "43,265.00", amount: "0.6", total: "25,959.00" },
    { price: "43,270.00", amount: "3.1", total: "134,137.00" },
    { price: "43,275.00", amount: "1.5", total: "64,912.50" },
  ],
};

// Mock data for recent trades
const recentTrades = [
  { time: "14:32:45", price: "43,250.00", amount: "0.15", side: "buy" },
  { time: "14:32:42", price: "43,248.50", amount: "0.32", side: "sell" },
  { time: "14:32:40", price: "43,252.00", amount: "0.08", side: "buy" },
  { time: "14:32:38", price: "43,245.00", amount: "0.45", side: "sell" },
  { time: "14:32:35", price: "43,250.00", amount: "0.22", side: "buy" },
];

export default function TradePage() {
  const [isClient, setIsClient] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [activePair, setActivePair] = React.useState(tradingPairs[0]);
  const [orderType, setOrderType] = React.useState<"limit" | "market">("limit");
  const [side, setSide] = React.useState<"buy" | "sell">("buy");
  const [amount, setAmount] = React.useState("");
  const [price, setPrice] = React.useState(activePair.price);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Update price when selected pair changes
  React.useEffect(() => {
    setPrice(activePair.price);
  }, [activePair]);

  if (!isClient) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const total = (parseFloat(amount.replace(/,/g, "")) * parseFloat(price.replace(/,/g, ""))).toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
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
            <span className="header-eyebrow">TRADE</span>
            <div className="header-title">Trade</div>
          </div>
          <button className="sync-btn" onClick={() => setIsSidebarOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </header>

        {/* TRADING PAIRS */}
        <section className="trading-pairs">
          <div className="pairs-scroll">
            {tradingPairs.map((pair) => (
              <button
                key={pair.id}
                className={`pair-chip ${activePair.id === pair.id ? "active" : ""}`}
                onClick={() => setActivePair(pair)}
              >
                <span className="pair-name">{pair.name}</span>
                <span className={`pair-change ${pair.change.startsWith("+") ? "positive" : "negative"}`}>
                  {pair.change}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* PRICE DISPLAY */}
        <section className="price-display">
          <div className="current-price">
            <span className="price-label">Current Price</span>
            <span className="price-value">
              {activePair.price}
              <small>EUR</small>
            </span>
            <span className={`price-change ${activePair.change.startsWith("+") ? "positive" : "negative"}`}>
              {activePair.change} (24h)
            </span>
          </div>
        </section>

        {/* ORDER FORM */}
        <section className="order-form">
          {/* Buy/Sell Tabs */}
          <div className="order-tabs">
            <button
              className={`order-tab ${side === "buy" ? "active" : ""}`}
              onClick={() => setSide("buy")}
            >
              Buy
            </button>
            <button
              className={`order-tab ${side === "sell" ? "active" : ""}`}
              onClick={() => setSide("sell")}
            >
              Sell
            </button>
          </div>

          {/* Order Type Tabs */}
          <div className="order-type-tabs">
            <button
              className={`order-type-tab ${orderType === "limit" ? "active" : ""}`}
              onClick={() => setOrderType("limit")}
            >
              Limit
            </button>
            <button
              className={`order-type-tab ${orderType === "market" ? "active" : ""}`}
              onClick={() => setOrderType("market")}
            >
              Market
            </button>
          </div>

          {/* Order Inputs */}
          <div className="order-inputs">
            {orderType === "limit" && (
              <div className="order-input-group">
                <label>Price (EUR)</label>
                <div className="input-with-actions">
                  <button className="input-action">-</button>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="order-input"
                  />
                  <button className="input-action">+</button>
                </div>
              </div>
            )}

            <div className="order-input-group">
              <label>Amount ({activePair.id.split("-")[0]})</label>
              <div className="input-with-actions">
                <button className="input-action" onClick={() => setAmount("")}>Max</button>
                <input
                  type="text"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="order-input"
                />
                <button className="input-action">{activePair.id.split("-")[0]}</button>
              </div>
            </div>

            {amount && orderType === "limit" && (
              <div className="order-total">
                <span>Total</span>
                <span className="total-value">{total} EUR</span>
              </div>
            )}

            <button className={`order-button ${side}`}>
              {side === "buy" ? "Buy" : "Sell"} {activePair.id.split("-")[0]}
            </button>
          </div>
        </section>

        {/* ORDER BOOK */}
        <section className="order-book">
          <h3 className="section-title">Order Book</h3>
          <div className="order-book-container">
            {/* Asks (Sell Orders) */}
            <div className="order-book-section asks">
              <div className="order-book-header">
                <span>Price (EUR)</span>
                <span>Amount</span>
                <span>Total</span>
              </div>
              <div className="order-book-list">
                {orderBook.asks.map((ask, index) => (
                  <div key={index} className="order-book-row">
                    <span className="row-price negative">{ask.price}</span>
                    <span className="row-amount">{ask.amount}</span>
                    <span className="row-total">{ask.total}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Price */}
            <div className="order-book-spread">
              <span className="spread-price">{activePair.price}</span>
              <span className="spread-label">Current Price</span>
            </div>

            {/* Bids (Buy Orders) */}
            <div className="order-book-section bids">
              <div className="order-book-list">
                {orderBook.bids.map((bid, index) => (
                  <div key={index} className="order-book-row">
                    <span className="row-price positive">{bid.price}</span>
                    <span className="row-amount">{bid.amount}</span>
                    <span className="row-total">{bid.total}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* RECENT TRADES */}
        <section className="recent-trades">
          <h3 className="section-title">Recent Trades</h3>
          <div className="trades-list">
            {recentTrades.map((trade, index) => (
              <div key={index} className="trade-row">
                <span className="trade-time">{trade.time}</span>
                <span className={`trade-price ${trade.side === "buy" ? "positive" : "negative"}`}>
                  {trade.price}
                </span>
                <span className="trade-amount">{trade.amount}</span>
              </div>
            ))}
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

