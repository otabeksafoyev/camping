"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import "./mahsulotlar.css";
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart } from "react-icons/fa";

interface Product {
  id: string;
  name: string;
  price: number;
  discount: number;
  description?: string;
  category?: string;
  rating?: number;
  img?: string[];
  images?: string[];
}

interface BasketItem extends Product {
  qty: number;
}

export default function MahsulotlarPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(data);
      } catch (error) {
        console.error("Mahsulotlarni olishda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const renderStars = (rating: number = 0) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) stars.push(<FaStar key={i} className="star" />);
    if (hasHalfStar) stars.push(<FaStarHalfAlt key="half" className="star" />);
    while (stars.length < 5)
      stars.push(<FaRegStar key={`empty-${stars.length}`} className="star" />);
    return stars;
  };

  const calcDiscountPercent = (price: number, discount: number) => {
    if (!price || !discount) return 0;
    return Math.round(((price - discount) / price) * 100);
  };

  const handleAddToCart = (product: Product) => {
    const basket: BasketItem[] = JSON.parse(localStorage.getItem("basket") || "[]");

    const existing = basket.find((p) => p.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      basket.push({ ...product, qty: 1 });
    }

    localStorage.setItem("basket", JSON.stringify(basket));
    alert("Mahsulot savatga qo‘shildi!");
  };

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Yuklanmoqda...</p>;

  return (
    <div className="cards-container">
      {products.map((product) => {
        const imageList = product.images || product.img || [];
        const mainImage = imageList[0] || "/placeholder.png";

        return (
          <div key={product.id} className="card">
            <img src={mainImage} alt={product.name} className="card-img" />
            <h3 className="card-name">{product.name}</h3>

            <div className="rating">
              {renderStars(product.rating)}
              <span>{product.rating?.toFixed(1) || "0.0"}/5</span>
            </div>

            <div className="price-box">
              <span className="new-price">${product.discount}</span>
              <span className="old-price">${product.price}</span>
              <span className="discount-badge">
                -{calcDiscountPercent(product.price, product.discount)}%
              </span>
            </div>

            <button className="cart-btn" onClick={() => handleAddToCart(product)}>
              <FaShoppingCart /> Savatga
            </button>
          </div>
        );
      })}
    </div>
  );
}
