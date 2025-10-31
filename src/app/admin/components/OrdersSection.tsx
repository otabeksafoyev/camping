"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import "./orders.css";
interface ProductItem {
  nom: string;
  narx: number;
  soni: number;
}

interface Order {
  id: string;
  ism_familiya: string;
  mahsulotlar: ProductItem[];
  manzil: string;
  raqami: string;
  xabar: string;
  nechtazakas: number;
  yetkazilganmi: boolean;
}

type FilterType = "all" | "delivered" | "pending";

export default function OrdersSection() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snap = await getDocs(collection(db, "orders"));
        const list: Order[] = snap.docs.map(docSnap => {
          const data = docSnap.data();
          console.log("Firebase doc:", data); 
          return {
            id: docSnap.id,
            ism_familiya: data.ism_familiya || "",
            mahsulotlar: data.mahsulotlar || [],
            manzil: data.manzil || "",
            raqami: data.raqami || "",
            xabar: data.xabar || "",
            nechtazakas: data.nechtazakas || 0,
            yetkazilganmi: data.yetkazilganmi || false,
          };
        });
        setOrders(list);
      } catch (err) {
        console.error("Firebase dan orders olishda xato:", err);
      }
    };
    fetchOrders();
  }, []);

  const toggleDelivered = async (orderId: string, current: boolean) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { yetkazilganmi: !current });
      setOrders(prev =>
        prev.map(o => (o.id === orderId ? { ...o, yetkazilganmi: !current } : o))
      );
    } catch (err) {
      console.error("Yetkazilganmi update xato:", err);
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === "delivered") return order.yetkazilganmi === true;
    if (filter === "pending") return order.yetkazilganmi === false;
    return true;
  });

  return (
    <div>
      <h2>Buyurtmalar</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>Filter: </label>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value as FilterType)}
        >
          <option value="all">Barchasi</option>
          <option value="delivered">Yetkazilganlar</option>
          <option value="pending">Yetkazilmaganlar</option>
        </select>
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ism Familiya</th>
            <th>Mahsulotlar</th>
            <th>Manzil</th>
            <th>Telefon</th>
            <th>Nechtazakas</th>
            <th>Xabar</th>
            <th>Yetkazilganmi</th>
            <th>Harakat</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.ism_familiya}</td>
              <td>
                {order.mahsulotlar.map((p, i) => (
                  <div key={i}>
                    {p.nom} - {p.soni} × ${p.narx}
                  </div>
                ))}
              </td>
              <td>{order.manzil}</td>
              <td>{order.raqami}</td>
              <td>{order.nechtazakas}</td>
              <td>{order.xabar}</td>
              <td>{order.yetkazilganmi ? "✅" : "❌"}</td>
              <td>
                {!order.yetkazilganmi && (
                  <button
                    onClick={() =>
                      toggleDelivered(order.id, order.yetkazilganmi)
                    }
                  >
                    Yetkazildi
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
