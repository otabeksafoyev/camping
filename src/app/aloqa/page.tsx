"use client";
import React, { useState } from "react";
import { db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import "../../styles/aloqa.css";

interface FormData {
  ism: string;
  familiya: string;
  email: string;
  nomer: string;
  ariza: string;
}

const Aloqa: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    ism: "",
    familiya: "",
    email: "",
    nomer: "",
    ariza: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "arizalar"), formData);
      alert("Arizangiz saqlandi!");
      setFormData({
        ism: "",
        familiya: "",
        email: "",
        nomer: "",
        ariza: "",
      });
    } catch (err) {
      console.error("Xato yuz berdi: ", err);
      alert("Xato yuz berdi, qayta urinib ko'ring.");
    }
  };

  return (
    <div className="aloqa-hm">
      <div className="al-rs">
        <h1>Biz bilan boglaning</h1>
      </div>

      <div className="aloqa-model">
        <div className="aloqa-50">
          <h1>Keling, biz bilan gaplashaylik</h1>
          <p>
            Savollar, sharhlar yoki takliflar? Shaklni toldiring va biz tez
            orada boglanamiz.
          </p>
          <h3>1055 Arthur ave Elk Groot, 67. New Palmas South Carolina.</h3>
          <h3>+1 234 678 9108 99</h3>
          <h3>Contact@moralizer.com</h3>
        </div>

        <div className="contact-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="ism"
              placeholder="First Name"
              value={formData.ism}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="familiya"
              placeholder="Last Name"
              value={formData.familiya}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="nomer"
              placeholder="Phone Number"
              value={formData.nomer}
              onChange={handleChange}
              required
            />
            <textarea
              name="ariza"
              placeholder="Your message..."
              value={formData.ariza}
              onChange={handleChange}
            />
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Aloqa;
