import { useEffect, useState } from "react"
import { Header } from "../Components/Header"
import { ModalWindow } from "../Components/ModalWindow"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { ModalBuyWindow } from "../Components/ModalBuyWindow"
import { actions as actionsModal } from "../reducers/modalContent"
import { Footer } from "../Components/Footer"
import { useNavigate, useParams} from "react-router-dom"
import { Coffee } from "../types/Coffee"
import { Loader } from "../Components/Loader"
import { getSomeProduct } from "../api"

export const SelectedCoffee = () => {
  const dispatch = useAppDispatch()
  const { modal } = useAppSelector(state => state.modal)

  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | null>(null)
  const [loading, setLoading] = useState(true)
  
  const navigate = useNavigate()
  const { productId } = useParams()

  function goBack() {
    navigate(-1)
  }

/*   useEffect(() => {
    setLoading(true)

    const selectedCoffees = coffee.coffee.find(arr => (
      coffee.selectedProductId === arr.id
    ))

    setSelectedCoffee(selectedCoffees || null)
    setLoading(false)
  }, [coffee.coffee, coffee.selectedProductId]) */

  useEffect(() => {
    if (!productId) return
    setLoading(true)
    getSomeProduct(+productId)
      .then(data => (
        setSelectedCoffee(data[0])
      ))
      
      .finally(() => setLoading(false))
    }, [productId])
    console.log(selectedCoffee);

  if (loading) {
    return (
      <Loader />  
    )
  }

  if (!selectedCoffee && !loading) {
    return (
      <>
        <div className="header__dark-theme">
          <Header />
        </div>
        {modal.modalActive && 
          <ModalWindow />
        }
        <div className="selected-coffee__false">
        <button
            onClick={() => {
              goBack()
            }}
            className="button selected-coffee__order-button order-absolute">
            Go back
          </button>
          <h2 className="selected-coffee__false--title">Product not found</h2>
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
            <img className="selected-coffee__image" src={selectedCoffee?.image_url} alt="selected-coffee-image" />
            }
              <h5 className="selected-coffee__price">{`Price: $${selectedCoffee?.price}`}</h5>
            </div>
            <div className="selected-coffee__title-section">
              <h2 className="selected-coffee__title">{`Name: ${selectedCoffee?.name}`}</h2>
              <p className="selected-coffee__paragraf">{`Description: ${selectedCoffee?.description}`}</p>
              <span className="selected-coffee__span">{`Region: ${selectedCoffee?.region}`}</span>
              <span className="selected-coffee__span">{`Weight: ${selectedCoffee?.weight}`}</span>
              <span className="selected-coffee__span">{`Flavor-Profile: ${selectedCoffee?.flavor_profile}`}</span>
              
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