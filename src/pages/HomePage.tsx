import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Header } from "../Components/Header"
import { ModalWindow } from "../Components/ModalWindow"
import { useAppSelector } from "../redux/hooks"
import { Footer } from "../Components/Footer"
import { HomePageSection1 } from "../Components/HomePageSection1"
import { HomePageSection2 } from "../Components/HomePageSection2"
import { HomePageSection3 } from "../Components/HomePageSection3"
import { HomePageSection4 } from "../Components/HomePageSection4"
import { HomePageSection5 } from "../Components/HomePageSection5"
import { HomePageSection6 } from "../Components/HomePageSection6"

export const HomePage = () => {
  const location = useLocation();
  const { modal } = useAppSelector(state => state.modal)

   /* Scrolls to the target section after navigating from another page */
   useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.substring(1);

      const scrollToElement = () => {
        const element = document.getElementById(elementId);
        if (element) {
          window.scrollTo({ top: element.offsetTop, behavior: "smooth" });
        }
      };
  
      // Delay to ensure DOM rendering is complete
      const timeoutId = setTimeout(scrollToElement, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [location.hash]);

  return (
    <div className="home-page">
      <Header />
      {modal.modalActive && 
        <ModalWindow />
      }
      <HomePageSection1 />
      <HomePageSection2 />
      <HomePageSection6 />
      <HomePageSection3 />
      <HomePageSection4 />
      <HomePageSection5 />
      <Footer />
    </div>
  )
} 