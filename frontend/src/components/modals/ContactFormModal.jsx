import React from "react";
import ContactForm from "../ContactForm";
import { useContactStore } from "../../stores/contactStore";

export default function ContactFormModal() {
    const { setShowContactForm } = useContactStore();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full cursor-default bg-background/80 backdrop-blur-md animate-in fade-in-0 animate-out fade-out-0 overflow-y-auto">
      <ContactForm />
      <button onClick={() => setShowContactForm(false)} className="absolute right-0 top-0 mt-5 mr-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
