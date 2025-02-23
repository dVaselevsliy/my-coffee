import { FormEvent, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { actions as actionsModal } from "../reducers/modalContent"
import { NavLink } from "react-router-dom"

export const ModalBuyWindow = () => {
  const [card, setCard] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorInput, setErrorInput] = useState('')
  const [isPurchaseSuccess, setIsPurchaseSuccess] = useState(false)

  const dispatch = useAppDispatch()
  const { modal } = useAppSelector(state => state.modal)
  
  const handleSumbmitInput = (event: FormEvent) => {
    event.preventDefault()
    setErrorInput('')

    if (card.toString().length !== 19) {
      setErrorInput('Card number should have 16 numbers')
      return
    }

    if (name.length === 0) {
      setErrorInput('Name should not be empty')
      return
    }

    if (email.length === 0) {
      setErrorInput('Email should not be empty')
      return
    }

    if (password.length === 0) {
      setErrorInput('Password should not be empty')
      return
    }

    setIsPurchaseSuccess(true)
    reset()
  }

  const reset = () => {
    setErrorInput('')
    setCard('')
    setName('')
    setEmail('')
    setPassword('')
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch(actionsModal.setModalBuyActive(false))
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, "") // Remove non-numeric characters
      .replace(/(.{4})/g, "$1 ") // Add space after every 4 digits
      .trim();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(event.target.value);
    setCard(formattedValue);
  };

  return (
      <div className="modal-buy-window">
      <form className="box box-modal" onSubmit={handleSumbmitInput}>
        <div className="field">
          <div className="box-settings__delete">
            <button
              onClick={() => {
                dispatch(actionsModal.setModalBuyActive(false))
              }}
            className="delete"></button>
          </div>
          <label className="label" htmlFor="ccn">Credit Card Number</label>
            <div className="control">
              <input
              autoFocus
              value={card || ''}
              onChange={handleChange}
              className={`input control--border field-font-family ${
                errorInput === 'Card number should have 16 numbers' && 'is-danger'
              }`}
              id="ccn"
              type="tel"
              inputMode="numeric"
              pattern="[0-9\s]{13,19}" 
              autoComplete="cc-number"
              minLength={19}
              maxLength={19}
              placeholder="xxxx xxxx xxxx xxxx"
              required />
          </div>
        </div>

        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className={`input control--border field-font-family ${
                errorInput === 'Name should not be empty' && 'is-danger'
              }`}
              type="text"
              required
              value={name}
              onChange={(event) => {
                setName(event.target.value)
              }}
            />
          </div>
        </div>
        
        {!modal.signIn && (
          <>
          <div className="control">
            <label className="label">Email</label>
              <input
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                }}
                className={`input control--border field-font-family ${
                  errorInput === 'Email should not be empty' && 'is-danger'
                }`}
                type="email"
                placeholder="e.g. alex@example.com" />
          </div>
          
          <div className="control">
            <label className="label label-margin-button">Password</label>
              <input
                required
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                }}
                className={`input control--border field-font-family ${
                  errorInput === 'Password should not be empty' && 'is-danger'
                }`}
                type="password"
                placeholder="********"
              />
            </div>
          </>
        )}

        <button
          disabled={isPurchaseSuccess}
          className="control__margin yellow-btn"
        >
          Place an order
        </button>

        {!!errorInput && (
          <p className="modal-buy-window__error">
            {errorInput}
          </p>
        )}

        {isPurchaseSuccess && (
          <p className="modal-buy-window__success">
            Your purchase was successfull!
            <br />
            Go back to the
            <NavLink
              to="/menu"
              onClick={() => {
                window.scrollTo(0, 0)
                dispatch(actionsModal.setModalBuyActive(false))
              }}
              className="modal-buy-window__success__link"
            >
              Menu Page
            </NavLink>
          </p>
        )}
      </form>
    </div>
  )
}