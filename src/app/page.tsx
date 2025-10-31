"use client";

import { useEffect, useState, useRef } from "react";
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

interface BasketItem {
  id: string;
  name: string;
  discount: number;
  qty: number;
  img?: string[];
}

interface Review {
  id: string;
  name: string;
  despcription: string;
  rating: number;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null);

  // Fetch products
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

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      const snap = await getDocs(collection(db, "mijozlar"));
      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Review[];
      setReviews(list);
    };
    fetchReviews();
  }, []);

  // Auto-slide reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 3000); // 3 soniya
    return () => clearInterval(interval);
  }, [reviews]);

  const handleAddToBasket = (product: Product) => {
    const basket: BasketItem[] = JSON.parse(localStorage.getItem("basket") || "[]");
    const existing = basket.find((b) => b.id === product.id);

    if (existing) existing.qty += 1;
    else
      basket.push({
        id: product.id,
        name: product.name,
        discount: product.price,
        qty: 1,
        img: product.img,
      });

    localStorage.setItem("basket", JSON.stringify(basket));
    alert("Mahsulot savatchaga qo‘shildi 🛒");
  };

  const faqs = [
    { q: "Mahsulotlarni qanday buyurtma qilsam bo‘ladi?", a: "Siz tanlagan mahsulotni savatchaga qo‘shib, to‘lov jarayonini davom ettirish orqali buyurtma qilishingiz mumkin." },
    { q: "To‘lov usullari qanday?", a: "Naqd, karta va onlayn to‘lov tizimlari mavjud." },
    { q: "Yetkazib berish qancha vaqt oladi?", a: "Odatda 2-5 ish kuni ichida yetkazib beriladi." },
    { q: "Mahsulotlarni qaytarish mumkinmi?", a: "Ha, 7 kun ichida shartlarga binoan qaytarish mumkin." },
    { q: "Mahsulotlar kafolatlanganmı?", a: "Har bir mahsulot ishlab chiqaruvchi tomonidan kafolat bilan ta’minlangan." },
    { q: "Sayohat mahsulotlarini tanlashda yordam bera olasizmi?", a: "Ha, biz sizga mos mahsulot tanlashda maslahat bera olamiz." },
    { q: "Yetkazib berish narxi qancha turadi?", a: "Buyurtma summasiga qarab bepul yoki arzon tarifda." },
    { q: "Agar buyurtma noto‘g‘ri kelsa, nima qilish kerak?", a: "Biz bilan bog‘laning — almashtirish yoki qaytarish imkoniyati bor." },
    { q: "Mahsulotlarni ko‘rish uchun oflayn do‘koningiz bormi?", a: "Hozircha onlayn tarzda ishlaymiz." },
    { q: "Saytingizda qanday mahsulotlarni topish mumkin?", a: "Turli xil sayohat, lager, mebel va jihozlar mavjud." },
  ];

  return (
    <div className="home-container">
      {/* Banner */}
      <section className="banner">
        <div className="banner-text">
          <h1>Zo‘r jihozlar bilan sarguzashtlarni kashf eting</h1>
          <p>Sarguzasht shijoatini kuchaytiruvchi va tajribangizni oshiruvchi kerakli jihozlarni toping.</p>
          <button className="banner-btn">Xarid qiling</button>
        </div>
        <div className="banner-img">
          <img src="/image.svg" alt="Banner" />
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <h2>Kategoriya va Mahsulotlar</h2>
        <div className="product-grid">
          {products.slice(0, 8).map((p) => {
            const img = p.img?.[0] || "/placeholder.png";
            const oldPrice = p.price;
            const newPrice = oldPrice - (oldPrice * p.discount) / 100;

            return (
              <div className="product-card" key={p.id} onClick={() => router.push(`/products/${p.id}`)}>
                <img src={img} alt={p.name} className="product-img" />
                <h4>{p.name}</h4>
                <div className="price">
                  <span className="new">${newPrice.toFixed(2)}</span>
                  <span className="old">${oldPrice.toFixed(2)}</span>
                </div>
                <div className="rating">
                  {Array.from({ length: Math.floor(p.rating) }, (_, i) => (<span key={i}>⭐</span>))}
                  {p.rating % 1 !== 0 && <span>✬</span>}
                  <span className="rating-number">{p.rating}</span>
                </div>
                <button className="cart-btn" onClick={(e) => { e.stopPropagation(); handleAddToBasket(p); }}>🛒</button>
              </div>
            );
          })}
        </div>
        <button className="see-all" onClick={() => router.push("/mahsulotlar")}>Hammasini ko‘rish</button>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Tez-tez beriladigan savollar</h2>
        <div className="faq-list">
          {faqs.map((item, i) => (
            <div key={i} className={`faq-item ${openIndex === i ? "active" : ""}`} onClick={() => setOpenIndex(openIndex === i ? null : i)}>
              <div className="faq-question">
                <span>{item.q}</span>
                <span>{openIndex === i ? "×" : "+"}</span>
              </div>
              {openIndex === i && <p className="faq-answer">{item.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <h2>Bizning mamnun mijozlarimiz</h2>
        <div className="review-slider-wrapper">
          <div
            className="review-slider"
            ref={sliderRef}
            style={{ transform: `translateX(-${currentSlide * 25}%)` }}
          >
            {reviews.map((r) => (
              <div className="review-card" key={r.id}>
                <div className="stars">
                  {Array.from({ length: Math.floor(r.rating) }, (_, i) => (<span key={i}>⭐</span>))}
                  {r.rating % 1 !== 0 && <span>✬</span>}
                  <span className="rating-number">{r.rating}</span>
                </div>
                <h4 className="review-name">{r.name}</h4>
                <p className="review-text">{r.despcription}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
