import { NavLink } from "react-router-dom"
import { Header } from "../Components/Header"
import { ModalWindow } from "../Components/ModalWindow"
import { useAppSelector } from "../redux/hooks"
import { Footer } from "../Components/Footer"

export const HomePage = () => {
  const { modal } = useAppSelector(state => state.modal)

  return (
    <div>
      <div className="home-page">
        <Header />
        {modal.modalActive && 
          <ModalWindow />
        }
        <div className="home-page__main">
          <p className="home-page__title">We’ve got your morning covered with</p>
          
          <h1 className="home-page__coffee">Coffee</h1>
  
          <p className="home-page__description">
            It is best to start your day with a cup of coffee. Discover the
            best flavours coffee you will ever have. We provide the best
            for our customers.
          </p>
  
            <NavLink className="
              header__sign-in--text-black size header__sign-in--text-black--fix
              header__button additional-indents header__button--fix
              "
              to="/menu">Order Now</NavLink>
        </div>
      </div>
        <Footer />
    </div>
  )
} 