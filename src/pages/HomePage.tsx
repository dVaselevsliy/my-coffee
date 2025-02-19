import { useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { Header } from "../Components/Header"
import { ModalWindow } from "../Components/ModalWindow"
import { useAppSelector } from "../redux/hooks"
import { Footer } from "../Components/Footer"
import { AboutUsPage } from "./AboutUsPage"

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
  }, []);

  return (
    <div>
      <div className="home-page">
        <Header />
        {modal.modalActive && 
          <ModalWindow />
        }
        <div className="home-page__main section-padding">
          <p className="home-page__title">We’ve got your morning covered with</p>
          
          <h1 className="home-page__coffee">Coffee</h1>
  
          <p className="home-page__description">
            It is best to start your day with a cup of coffee. Discover the
            best flavours coffee you will ever have. We provide the best
            for our customers.
          </p>
  
            <NavLink className="yellow-btn home-page__btn"
              to="/menu">Order Now</NavLink>
        </div>
      </div>
          <AboutUsPage />
        <Footer />
    </div>
  )
} 