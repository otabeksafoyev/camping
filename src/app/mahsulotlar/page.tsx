"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import "../home.css";

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

interface BasketItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  img?: string[];
}

export default function MahsulotlarPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams?.get("search")?.toLowerCase() || "";

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

  useEffect(() => {
    if (!search) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(search)
      );
      setFilteredProducts(filtered);
    }
  }, [search, products]);

  const handleAddToBasket = (product: Product) => {
    const basket: BasketItem[] = JSON.parse(localStorage.getItem("basket") || "[]");
    const existing = basket.find((b) => b.id === product.id);

    if (existing) {
      existing.qty += 1;
    } else {
      basket.push({
        id: product.id,
        name: product.name,
        price: product.price,
        qty: 1,
        img: product.img,
      });
    }

    localStorage.setItem("basket", JSON.stringify(basket));
    alert("Mahsulot savatchaga qo‘shildi 🛒");
  };

  return (
    <div className="home-container">
      <h2 className="section-title">Barcha mahsulotlar</h2>

      <div className="product-grid">
        {filteredProducts.map((p) => {
          const img = p.img?.[0] || "/placeholder.png";
          const oldPrice = p.price;
          const newPrice = oldPrice - (oldPrice * p.discount) / 100;

          return (
            <div
              className="product-card"
              key={p.id}
              onClick={() => router.push(`/products/${p.id}`)}
            >
              <img src={img} alt={p.name} className="product-img" />

              <h4>{p.name}</h4>
              <div className="price">
                <span className="new">${newPrice.toFixed(2)}</span>
                <span className="old">${oldPrice.toFixed(2)}</span>
              </div>
              <div className="rating">⭐ {p.rating}</div>

              <button
                className="cart-btn full-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToBasket(p);
                }}
              >
                🛒
              </button>
            </div>
          );
        })}
        {filteredProducts.length === 0 && <p>Hech qanday mahsulot topilmadi.</p>}
      </div>
    </div>
  );
}
