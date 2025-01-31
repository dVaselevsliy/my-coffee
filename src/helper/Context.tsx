import React, { useState } from "react"

export const ErrorContext = React.createContext({
  errorMessage: '',
  setErrorMessage: (errorMessage: string) => {}
})

type Props = {
  childeren: React.ReactNode
}

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState('');
}