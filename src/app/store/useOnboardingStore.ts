import { create } from 'zustand';

interface OnboardingStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useOnboardingstore = create<OnboardingStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
