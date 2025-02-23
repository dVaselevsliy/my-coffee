import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import iconBurger from '../images/Icon-Burger-menu.png';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { actions as actionsModal } from '../reducers/modalContent';

export const Header = () => {
  const dispatch = useAppDispatch()
  const { pathname } = useLocation();
  const { modal } = useAppSelector(state => state.modal)

  /* exists everywhere */
  const scrollToContacts = () => {
    const contactsElement = document.getElementById('contacts')
    
    if (contactsElement) {
      contactsElement.scrollIntoView({behavior: 'smooth'})
    }
  }

  /* exists only on home page */
  const scrollToSection = (elementId: string) => {
    if (pathname !== '/') {
      window.location.href = `/#/#${elementId}`;
    } else {
      // Scroll to the element immediately
      const element = document.getElementById(elementId);
      if (element) {
        window.scrollTo({ top: element.offsetTop, behavior: "smooth" });
      }
    }
  }

  return (
    <header className="header section-padding" id='header'>
        <span className="header__bean-scene">Bean Scene</span>

        <div className="header__links">
          <NavLink
            className="header__link"
            to="/"
            onClick={() => window.scrollTo(0, 0)}
          >
            Home
          </NavLink>
            <NavLink
              onClick={() => window.scrollTo(0, 0)}
              className="header__link"
              to="/menu"
            >
              Menu
            </NavLink>
          <button
            onClick={() => scrollToSection('about-us')}
            className="header__link"
          >About Us</button>
          <button
            onClick={() => {
              scrollToContacts()
            }}
            className="header__link">Contact Us</button>
        </div>

        {modal.signIn ? (
          <div className="header__sign-in">
            <p className='header__sign-in--email'>{modal.email}</p>
          </div>
        ) : (
          <div className="header__sign-in">
          <div
            onClick={() => {
              dispatch(actionsModal.setModalActive(!modal.modalActive))
            }}
            className="yellow-btn">
            SignUp
          </div>
        </div>
        )}
        
        <NavLink to="/aside" className="header__icon header__icon--burger">
              <img src={iconBurger} alt="icon-burger.png" />
          </NavLink>

    </header>
  );
};
