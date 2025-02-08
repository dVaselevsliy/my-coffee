import { NavLink } from 'react-router-dom'
import iconClose from '../images/icon-close.png'
import { ModalWindow } from '../Components/ModalWindow'
import { useAppSelector } from '../redux/hooks'

export const Aside = () => {
  const { modal } = useAppSelector(state => state.modal)

  return (
    <aside className="aside page__aside">
      {modal.modalActive && 
        <ModalWindow />
      }
      <div className="header__top">
        <span className="header__bean-scene">Bean Scene</span>
          {!modal.signIn && (
            <div className="header__sign-in">
              <div className="header__button">
                <a className="header__sign-in--text-black" href="#">SignUp</a>
              </div>
            </div>
          )}
            <a href='#'>
              <img src={iconClose} alt="bottom-close" />
            </a>
      </div>
      
      <div className="aside__links">
          <NavLink className="aside__link" to="/">Home</NavLink>
          <NavLink className="aside__link" to="/menu">Menu</NavLink>
          <NavLink className="aside__link" to="/about-us">About Us</NavLink>
          <a className="aside__link" href="#">Contact Us</a>
        </div>
    </aside>
  )
}
