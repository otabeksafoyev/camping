"use client";

import React from "react";
import "./Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeTab: "products" | "applications" | "blogs" | "orders"; 
  setActiveTab: React.Dispatch<
    React.SetStateAction<"products" | "applications" | "blogs" | "orders">
  >;
}

export default function Sidebar({
  isOpen,
  onToggle,
  activeTab,
  setActiveTab,
}: SidebarProps) {
 
  const menuItems = [
    { key: "products", label: "Mahsulotlar" },
    { key: "applications", label: "Arizalar" },
    { key: "blogs", label: "Bloglar" },
    { key: "orders", label: "Buyurtmalar" },
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={onToggle}>
        {isOpen ? "❮" : "❯"}
      </button>

      <div className="sidebar-inner">
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li
              key={item.key}
              className={activeTab === item.key ? "active" : ""}
              onClick={() => setActiveTab(item.key as any)}
            >
              {isOpen ? item.label : item.label.charAt(0)} 
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
