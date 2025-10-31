"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ProductsSection from "./components/ProductsSection";
import ApplicationsSection from "./components/ApplicationsSection";
import BlogsSection from "./components/BlogsSection";
import OrdersSection from "./components/OrdersSection";
import "./style.css";

export default function AdminPage() {
  const router = useRouter();

  
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      router.replace("/admin/login");
    }
  }, [router]);

  const [activeTab, setActiveTab] = useState<"products" | "applications" | "blogs" | "orders">("products");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={`admin-container ${isSidebarOpen ? "" : "sidebar-closed"}`}>
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="admin-content">
        <Header />
        <div className="content-area">
          {activeTab === "products" && <ProductsSection />}
          {activeTab === "applications" && <ApplicationsSection />}
          {activeTab === "blogs" && <BlogsSection />}
          {activeTab === "orders" && <OrdersSection />}
        </div>
      </div>
    </div>
  );
}
