import { NavLink } from 'react-router-dom';
import iconBurger from '../images/Icon-Burger-menu.png';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { actions as actionsModal } from '../reducers/modalContent';

export const Header = () => {
  const dispatch = useAppDispatch()
  const { modal } = useAppSelector(state => state.modal)

  const scrollToContacts = () => {
    const contactsElement = document.getElementById('contacts')
    
    if (contactsElement) {
      contactsElement.scrollIntoView({behavior: 'smooth'})
    }
  }

  return (
    <header className="header" id='header'>
      <div className="header__top">
        <span className="header__bean-scene">Bean Scene</span>

        <div className="header__links">
          <NavLink
            className="header__link"
            to="/"
            onClick={() => window.scrollTo(0, 0)}
          >Home</NavLink>
            <NavLink onClick={() => window.scrollTo(0, 0)} className="header__link" to="/menu">Menu</NavLink>
            <NavLink onClick={() => window.scrollTo(0, 0)} className="header__link" to="/about-us">About Us</NavLink>
          <button
            onClick={() => {
              scrollToContacts()
            }}
            className="header__link">Contact Us</button>
        </div>

        {!modal.signIn && (
          <div className="header__sign-in">
            <div
              onClick={() => {
                dispatch(actionsModal.setModalActive(!modal.modalActive))
              }}
              className="header__button">
              <span className="header__sign-in--text-black">SignUp</span>
            </div>
          </div>
        )}
        
        <NavLink to="/aside" className="header__icon header__icon--burger">
              <img src={iconBurger} alt="icon-burger.png" />
          </NavLink>
      </div>
    </header>
  );
};
