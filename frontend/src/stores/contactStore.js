import { create } from "zustand";

export const useContactStore = create(
  (set) => ({
      showContactForm: false,
      setShowContactForm: (state) => set({ showContactForm: state }),
      updated: false,
      setUpdated: (state) => set({updated: state})
    }),
);
