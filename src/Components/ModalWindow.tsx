import React, { useCallback, useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { actions as actionsModal } from "../reducers/modalContent"


export const ModalWindow: React.FC = () => {
  const [password, setPassword] = useState('')
  const [errorInput, setErrorInput] = useState('')

  const dispatch = useAppDispatch()
  const { modal } = useAppSelector(state => state.modal)

  const handleSumbmitInput = (event: React.FormEvent) => {
    event.preventDefault()
    setErrorInput('')

    if (modal.email.length === 0) {
      setErrorInput('Email should not be empty')
      return
    }

    if (password.length === 0) {
      setErrorInput('Password should not be empty')
      return
    }

    dispatch(actionsModal.setSignIn(true))
    console.log(modal.email);
    
    if (modal.email.length !== 0 || password.length !== 0) {
      return reset()
    }
  }

  const reset = () => {
    setErrorInput('')
    setPassword('')
    dispatch(actionsModal.setModalActive(false))
  }

  const mouseRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleMouseClick = useCallback(
    (event: MouseEvent) => {
    if (mouseRef.current && !mouseRef.current?.contains(event.target as Node)) {
      dispatch(actionsModal.setModalActive(false))
    }
  }, [dispatch])

  useEffect(() => {
    document.addEventListener('mousedown', handleMouseClick)
    return () => {
      document.removeEventListener('mousedown', handleMouseClick)
    }
  }, [handleMouseClick])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div ref={mouseRef} className="modal-window">
        <form className="box box-settings" onSubmit={handleSumbmitInput}>
        <div className="field">
          <div className="box-settings__delete">
            <button
              onClick={() => {
                dispatch(actionsModal.setModalActive(false))
              }}
              className="delete"></button>
          </div>
        <label className="label">Email</label>
        <div className="control">
            <input
              required
              ref={inputRef}
              value={modal.email}
              onChange={(event) => {
                dispatch(actionsModal.setEmail(event.target.value))
              }}
              className={`input ${
                errorInput === 'Email should not be empty' && 'is-danger'
              }`}
              type="email"
              placeholder="e.g. alex@example.com" />
          </div>
          <h5 className="box-settings__error-input">
            {errorInput === 'Email should not be empty' && (
              errorInput
            )}
          </h5>
      </div>

      <div className="field">
        <label className="label">Password</label>
        <div className="control">
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
          <h5 className="box-settings__error-input">
            {errorInput === 'Password should not be empty' && (
              errorInput
            )}
          </h5>
      </div>

      <button className="button is-primary">Sign in</button>
    </form>
    </div>
  )
}