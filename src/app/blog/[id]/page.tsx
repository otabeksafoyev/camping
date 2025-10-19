"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"
import Image from "next/image";

interface Article {
  id?: string;
  title: string;
  author: string;
  description: string;
  rasm: string;
}

export default function BlogDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const getArticle = async () => {
      if (!id) return;
      const ref = doc(db, "articles", id as string);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setArticle(snap.data() as Article);
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
          alt={article.title}
          width={600}
          height={400}
        />
      </div>
      <div className="blog-detail-info">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <p className="author">Muallif: {article.author}</p>
      </div>
    </div>
  );
}
