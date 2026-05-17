import { create } from "zustand";

type MenuStore = {
    open: boolean;

    openMenu: () => void;
    closeMenu: () => void;
    toggleMenu: () => void;
};

export const useMenuStore = create<MenuStore>((set) => ({
    open: false,

    openMenu: () => set({ open: true }),
    closeMenu: () => set({ open: false }),
    toggleMenu: () => set((state) => ({
        open: !state.open,
    })),
}));