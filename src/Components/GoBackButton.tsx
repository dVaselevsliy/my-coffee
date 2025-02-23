import { useNavigate } from "react-router-dom"

const GoBackButton = () => {
  const navigate = useNavigate()

  function goBack() {
    navigate(-1)
  }

  return (
    <button
      onClick={goBack}
      className=" selected-coffee__order-button"
    >
      Go back
    </button>
  )
}

export default GoBackButton