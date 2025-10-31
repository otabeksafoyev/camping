"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useRouter } from "next/navigation";
import "./home.css";

interface Product {
  id: string;
  name: string;
  price: number;
  discount: number;
  img: string[];
  rating: number;
  description: string;
  category: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const snap = await getDocs(collection(db, "products"));
      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(list);
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      {/* Banner qismi */}
      <section className="banner">
        <div className="banner-text">
          <h1>Zo‘r jihozlar bilan sarguzashtlarni kashf eting</h1>
          <p>
            Sarguzasht shijoatini kuchaytiruvchi va tajribangizni oshiruvchi kerakli jihozlarni toping. 
            Har bir mahsulot sifat, chidamlilik va qulaylik uchun sinchkovlik bilan tanlangan.
          </p>
          <button className="banner-btn">Xarid qiling</button>

          <div className="stats">
            <div>
              <h3>200+</h3>
              <p>Aniq brendlar</p>
            </div>
            <div>
              <h3>2,000+</h3>
              <p>Yuqori sifatli mahsulotlar</p>
            </div>
            <div>
              <h3>30,000+</h3>
              <p>Baxtli mijozlar</p>
            </div>
          </div>
        </div>

        {/* Siz rasmni o‘zingiz qo‘yasiz */}
        <div className="banner-img">
          <img src="/image.svg" alt="Banner" />
        </div>
      </section>

      {/* Mahsulotlar bo‘limi */}
      <section className="products-section">
        <h2>Kategoriya va Mahsulotlar</h2>

        <div className="product-grid">
          {products.slice(0, 8).map((p) => {
            const img = p.img?.[0] || "/placeholder.png";
            const oldPrice = p.price;
            const newPrice = oldPrice - (oldPrice * p.discount) / 100;

            return (
              <div className="product-card" key={p.id}>
                <img src={img} alt={p.name} className="product-img" />
                <h4>{p.name}</h4>
                <div className="price">
                  <span className="new">${newPrice.toFixed(2)}</span>
                  <span className="old">${oldPrice.toFixed(2)}</span>
                </div>
                <div className="rating">⭐ {p.rating}</div>
                <button className="cart-btn">🛒</button>
              </div>
            );
          })}
        </div>

        <button className="see-all" onClick={() => router.push("/mahsulotlar")}>
          Hammasini ko‘rish
        </button>
      </section>
    </div>
  );
}
