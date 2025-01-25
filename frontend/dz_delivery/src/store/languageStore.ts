import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LanguageState {
  language: string | null;
  setLanguage: (language: string | null) => void;
}

const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "en", // default language
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "language-storage", // name of the item in storage
    }
  )
);

export default useLanguageStore;
