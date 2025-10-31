"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "./single.css";

interface Product {
  id: string;
  name: string;
  price: number;
  discount: number;
  description: string;
  img?: string[];
  category: string;
  rating?: number;
}

interface BasketItem {
  id: string;
  name: string;
  discount: number;
  qty: number;
  img?: string[];
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = { id: docSnap.id, ...docSnap.data() } as Product;
        setProduct(data);
        setMainImage(data.img?.[0] || "/placeholder.png");
      }
    };
    fetchProduct();
  }, [id]);

  // Loader o'chirildi
  if (!product) return null;

  // ⭐ Yulduzlar
  const renderStars = (rating: number = 0) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    for (let i = 0; i < full; i++) stars.push(<FaStar key={i} className="star" />);
    if (half) stars.push(<FaStarHalfAlt key="half" className="star" />);
    while (stars.length < 5) stars.push(<FaRegStar key={`empty-${stars.length}`} className="star" />);
    return stars;
  };

  // 🛒 Savatchaga qo‘shish
  const handleAddToBasket = () => {
    const basket: BasketItem[] = JSON.parse(localStorage.getItem("basket") || "[]");
    const existing = basket.find((b) => b.id === product.id);

    if (existing) existing.qty += qty;
    else
      basket.push({
        id: product.id,
        name: product.name,
        discount: product.price,
        qty,
        img: product.img,
      });

    localStorage.setItem("basket", JSON.stringify(basket));
    alert("Mahsulot savatchaga qo‘shildi 🛒");
  };

  // 💰 Chegirma %
  const discountPercent = Math.round(((product.price - product.discount) / product.price) * 100);

  return (
    <div className="product-detail">
      <div className="left-section">
        <div className="image-thumbnails">
          {product.img?.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setMainImage(img)}
              className={`thumb ${img === mainImage ? "active" : ""}`}
              alt="preview"
            />
          ))}
        </div>
        <div className="main-image">
          <img src={mainImage} alt={product.name} />
        </div>
      </div>

      <div className="right-section">
        <h1>{product.name}</h1>

        <div className="rating">
          {renderStars(product.rating)}
          <span>{product.rating?.toFixed(1) || "0"}/5</span>
        </div>

        <div className="price-section">
          <span className="current">${product.discount}</span>
          <span className="old">${product.price}</span>
          <span className="discount">-{discountPercent}%</span>
        </div>

        <div className="desc">
          <p><strong>Tavsif:</strong> {product.description}</p>
          <p><strong>Kategoriya:</strong> {product.category}</p>
        </div>

        <div className="quantity">
          <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
          <span>{qty}</span>
          <button onClick={() => setQty(qty + 1)}>+</button>
        </div>

        <button className="add-to-cart" onClick={handleAddToBasket}>
          Savatchaga qo‘shish
        </button>
      </div>
    </div>
  );
}
