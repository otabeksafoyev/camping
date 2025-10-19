import Image from "next/image";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="foother">
      <div className="foother-1">
        <Image src="/foother.svg" alt="Logo" width={120} height={80} />
      </div>

      <div className="foother-kompaniya">
        <h2>
          <span>Kompaniya</span>
          <hr />
          Biz haqimizda
          <hr />
          Xususiyatlar
          <hr />
          Ishlash jarayoni
          <hr />
          Karyera imkoniyatlari
          <hr />
        </h2>
      </div>

      <div className="foother-kompaniya">
        <h2>
          <span>Yordam</span>
          <hr />
          Mijozlarni qo‘llab-quvvatlash
          <hr />
          Yetkazib berish tafsilotlari
          <hr />
          Shartlar va qoidalar
          <hr />
          Maxfiylik siyosati
          <hr />
        </h2>
      </div>

      <div className="foother-kompaniya">
        <h2>
          <span>Resurslar</span>
          <hr />
          Bepul e-kitoblar
          <hr />
          Dasturlash bo‘yicha qo‘llanmalar
          <hr />
          Qanday foydalanish - Blog
          <hr />
          YouTube pleylist
          <hr />
        </h2>
      </div>
    </footer>
  );
}
