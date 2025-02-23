import { NavLink } from 'react-router-dom'
import iconClose from '../images/icon-close.png'
import { ModalWindow } from '../Components/ModalWindow'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { actions as actionsModal } from '../reducers/modalContent'

export const Aside = () => {
  const { modal } = useAppSelector(state => state.modal)
  const dispatch = useAppDispatch()

  return (
    <aside className="aside page__aside ">
      {modal.modalActive && 
        <ModalWindow />
      }
      <div className="header__top section-padding">
        <span className="header__bean-scene">Bean Scene</span>
          {!modal.signIn && (
          <div
            onClick={() => {
            dispatch(actionsModal.setModalActive(!modal.modalActive))
            }}
            className="header__sign-in">
              <span className="yellow-btn">SignUp</span>
            </div>
          )}
            <a href='#'>
          <img
            className='header__bottom-close'
            src={iconClose} alt="bottom-close"
          />
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
