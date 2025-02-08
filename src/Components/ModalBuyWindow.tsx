import { FormEvent, useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { actions as actionsModal } from "../reducers/modalContent"

export const ModalBuyWindow = () => {
  const [card, setCard] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorInput, setErrorInput] = useState('')

  const dispatch = useAppDispatch()
  const { modal } = useAppSelector(state => state.modal)
  
  const handleSumbmitInput = (event: FormEvent) => {
    event.preventDefault()
    setErrorInput('')

    if (card.toString().length !== 16) {
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

    dispatch(actionsModal.setBuySuccessfully(true))
    reset()
  }

  const reset = () => {
    setErrorInput('')
    setCard(0)
    setName('')
    setEmail('')
    setPassword('')
    dispatch(actionsModal.setModalBuyActive(false))
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
              onChange={(event) => {
                setCard(+event.target.value)
              }}
              className="input"
              id="ccn"
              type="tel"
              inputMode="numeric"
              pattern="[0-9\s]{13,19}" 
              autoComplete="cc-number"
              minLength={16}
              maxLength={16}
              placeholder="xxxx xxxx xxxx xxxx"
              required />
          </div>
        </div>

        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input"
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
                className={`input ${
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
                className={`input ${
                  errorInput === 'Password should not be empty' && 'is-danger'
                }`}
                type="password"
                placeholder="********"
              />
            </div>
          </>
        )}


          <div className="order-button">
            <button className="button is-primary">Place an order</button>
          </div>
      </form>
    </div>
  )
}