import { useEffect, useState } from "react"
import { Header } from "../Components/Header"
import { ModalWindow } from "../Components/ModalWindow"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { ModalBuyWindow } from "../Components/ModalBuyWindow"
import { actions as actionsModal } from "../reducers/modalContent"
import { Footer } from "../Components/Footer"
import { useNavigate } from "react-router-dom"
import { Coffee } from "../types/Coffee"

export const SelectedCoffee = () => {
  const dispatch = useAppDispatch()
  const { coffee } = useAppSelector(state => state.coffee)
  const { modal } = useAppSelector(state => state.modal)

  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | null>(null)
  
  const navigate = useNavigate()

  function goBack() {
    navigate(-1)
  }

  useEffect(() => {
    const selectedCoffees = coffee.coffee.find(arr => (
      coffee.selectedProductId === arr.id
    ))
    setSelectedCoffee(selectedCoffees || null)
  }, [coffee.coffee, coffee.selectedProductId])

  console.log(selectedCoffee);

  if (!selectedCoffee) {
    return (
      <>
        <div className="header__dark-theme">
          <Header />
        </div>
        {modal.modalActive && 
          <ModalWindow />
        }
        <div className="selected-coffee">
          <h2 className="selected-coffee__title">Not search product</h2>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="header__dark-theme">
        <Header />
      </div>
      {modal.modalActive && 
        <ModalWindow />
      }

        {modal.modalBuyActive &&
          <ModalBuyWindow />
        }
      
      {modal.buySuccessfully ? (
        <div className="selected-coffee__order-sent-div">
          <button
            onClick={() => {
              dispatch(actionsModal.setBuySuccessfully(false))
            }}
            className="button selected-coffee__order-button ">
            Go back
          </button>
          <h2 className="selected-coffee__order-sent">the order will be shipped soon!</h2>

          {/* <img src='/public/check.png' alt="" /> */}
        </div>
        ) : (
          <div className="selected-coffee-box">
            {!modal.modalBuyActive &&
                  <button
                    onClick={goBack}
                    className="button selected-coffee__order-button back-button-order">
                      Go back
                  </button>
                }
          <div className="selected-coffee">
              <div className="selected-coffee__image-section">
            {!modal.modalBuyActive &&
            <img className="selected-coffee__image" src={selectedCoffee.image_url} alt="selected-coffee-image" />
            }
              <h5 className="selected-coffee__price">{`Price: $${selectedCoffee.price}`}</h5>
            </div>
            <div className="selected-coffee__title-section">
              <h2 className="selected-coffee__title">{`Name: ${selectedCoffee.name}`}</h2>
              <p className="selected-coffee__paragraf">{`Description: ${selectedCoffee.description}`}</p>
              <span className="selected-coffee__span">{`Region: ${selectedCoffee.region}`}</span>
              <span className="selected-coffee__span">{`Weight: ${selectedCoffee.weight}`}</span>
              <span className="selected-coffee__span">{`Flavor-Profile: ${selectedCoffee.flavor_profile}`}</span>
              
              
              <button
                onClick={() => {
                  dispatch(actionsModal.setModalBuyActive(true))
              }}
                className="selected-coffee__button">Buy</button>
            </div>
          </div>
        </div>
      )}
      {!modal.modalBuyActive && (
        <div className="footer-margin-top">
          <Footer />
        </div>
      )}
    </>
  )
}