"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";

interface Article {
  id?: string;
  sarlavxa: string;
  muallif: string;
  kontent?: string;
  rasm: string;
  createdAt: string;
}

export default function BlogDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const getArticle = async () => {
      if (!id) return;
      const ref = doc(db, "bloglar", id as string);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setArticle({
          id: snap.id,
          ...snap.data() as Omit<Article, "id">
        });
      }
    };
    getArticle();
  }, [id]);

  if (!article) return <p>Yuklanmoqda...</p>;

  return (
    <div className="blog-detail">
      <div className="blog-detail-img">
        <Image
          src={article.rasm || "/no-image.jpg"}
          alt={article.sarlavxa}
          width={600}
          height={400}
        />
      </div>
      <div className="blog-detail-info">
        <h1>{article.sarlavxa}</h1>
        <p>{article.kontent}</p>
        <p className="author">Muallif: {article.muallif}</p>
        <p className="date">Nashr qilingan: {new Date(article.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
