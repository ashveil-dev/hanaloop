// components/layout/ModalRoot.tsx
"use client";

import { useEffect } from "react";
import ReactModal from "react-modal";

export default function ModalRoot() {
  useEffect(() => {
    ReactModal.setAppElement(document.body);
  }, []);
  return null;
}