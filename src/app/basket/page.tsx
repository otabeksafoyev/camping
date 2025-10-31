"use client";

import { useEffect, useState } from "react";
import "./basket.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../lib/firebase";

interface BasketItem {
  id: string;
  name: string;
  discount: number;
  qty: number;
  images?: string[];
  img?: string[];
}

export default function BasketPage() {
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    raqam: "",
    manzil: "",
    xabar: "",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("basket") || "[]");
    setBasket(saved);
  }, []);

  const handleQtyChange = (id: string, type: "inc" | "dec") => {
    const updated = basket.map((item) =>
      item.id === id
        ? { ...item, qty: type === "inc" ? item.qty + 1 : Math.max(1, item.qty - 1) }
        : item
    );
    setBasket(updated);
    localStorage.setItem("basket", JSON.stringify(updated));
  };

  const handleDelete = (id: string) => {
    const updated = basket.filter((b) => b.id !== id);
    setBasket(updated);
    localStorage.setItem("basket", JSON.stringify(updated));
  };

  const handleOrderSubmit = async () => {
    if (!formData.fullname || !formData.raqam || !formData.manzil) {
      alert("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    const order = {
      ism_familiya: formData.fullname,
      raqami: formData.raqam,
      manzil: formData.manzil,
      xabar: formData.xabar,
      nechtazakas: basket.reduce((t, i) => t + i.qty, 0),
      mahsulotlar: basket.map((b) => ({
        nom: b.name,
        soni: b.qty,
        narx: b.discount,
      })),
      yetkazilganmi: false,
    };

    await addDoc(collection(db, "orders"), order);
    alert("Buyurtma yuborildi!");
    localStorage.removeItem("basket");
    setBasket([]);
    setShowModal(false);
  };

  const totalPrice = basket.reduce((t, i) => t + i.discount * i.qty, 0);
  const discountAmount = totalPrice * 0.2;
  const finalPrice = totalPrice - discountAmount;

  return (
    <div className="basket-container">
      {basket.length === 0 ? (
        <p className="empty-text">Savat bo‘sh 😔</p>
      ) : (
        <div className="basket-grid">
          {/* Chap tomon */}
          <div className="basket-items">
            {basket.map((item) => {
              const mainImage = (item.images || item.img || [])[0] || "/placeholder.png";
              return (
                <div className="basket-item" key={item.id}>
                  <img src={mainImage} alt={item.name} className="basket-img" />
                  <div className="basket-info">
                    <h4>{item.name}</h4>
                    <p>${item.discount}</p>
                    <div className="qty-control">
                      <button onClick={() => handleQtyChange(item.id, "dec")}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => handleQtyChange(item.id, "inc")}>+</button>
                    </div>
                  </div>
                  <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                    🗑
                  </button>
                </div>
              );
            })}
          </div>

          {/* O‘ng tomon */}
          <div className="order-summary">
            <h3>Buyurtma xulosasi</h3>
            <div className="summary-row">
              <span>Oraliq jami</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row discount">
              <span>Chegirma (-20%)</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
            <div className="summary-total">
              <span>Umumiy</span>
              <strong>${finalPrice.toFixed(2)}</strong>
            </div>

            <button className="order-btn" onClick={() => setShowModal(true)}>
              Buyurtma berish →
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Buyurtma ma’lumotlari</h2>
            <input
              type="text"
              placeholder="Ism Familiya"
              onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
            />
            <input
              type="number"
              placeholder="Telefon raqam"
              onChange={(e) => setFormData({ ...formData, raqam: e.target.value })}
            />
            <input
              type="text"
              placeholder="Manzil"
              onChange={(e) => setFormData({ ...formData, manzil: e.target.value })}
            />
            <textarea
              placeholder="Xabar"
              onChange={(e) => setFormData({ ...formData, xabar: e.target.value })}
            ></textarea>
            <div className="modal-buttons">
              <button onClick={handleOrderSubmit}>Yuborish</button>
              <button onClick={() => setShowModal(false)}>Bekor qilish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
