import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScroolMyTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}