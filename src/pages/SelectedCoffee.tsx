import { useEffect, useState } from "react"
import { Header } from "../Components/Header"
import { ModalWindow } from "../Components/ModalWindow"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { ModalBuyWindow } from "../Components/ModalBuyWindow"
import { actions as actionsModal } from "../reducers/modalContent"
import { Footer } from "../Components/Footer"
import { useParams} from "react-router-dom"
import { Coffee } from "../types/Coffee"
import { Loader } from "../Components/Loader"
import { getProduct } from "../api"
import GoBackButton from '../Components/GoBackButton'

export const SelectedCoffee = () => {
  const dispatch = useAppDispatch()
  const { modal } = useAppSelector(state => state.modal)

  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | null>(null)
  const [loading, setLoading] = useState(true)
  
  
  const { productId } = useParams()

  
  useEffect(() => {
    if (!productId) return

    setLoading(true)

    getProduct(+productId)
      .then(data => {
        if (data.length !== 0) {
          setSelectedCoffee(data[0])
        } else {
          setSelectedCoffee(null)
        }
      })
      .finally(() => setLoading(false))
    }, [productId])

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
          <GoBackButton />
          <h2 className="selected-coffee__false--title">Product not found</h2>
        </div>
      </>
    )
  }

  return (
    <div>
      <Header />
      {modal.modalActive && 
        <ModalWindow />
      }
      {modal.modalBuyActive &&
        <ModalBuyWindow />
      }
      <GoBackButton />
      <div className="selected-coffee section-padding">
        <div className="selected-coffee__image-section">
          <img
            className="selected-coffee__image"
            src={selectedCoffee?.image_url}
            alt="selected-coffee-image"
          />
        <p className="selected-coffee__price">
          {`Price: $${selectedCoffee?.price}`}
        </p>
      </div>
      <div className="selected-coffee__title-section">
          <h2 className="selected-coffee__title title">
            {selectedCoffee?.name}
          </h2>
          <p className="selected-coffee__paragraf">
            {selectedCoffee?.description}
          </p>
          <span className="selected-coffee__span">
            {`Region: ${selectedCoffee?.region}`}
          </span>
          <span className="selected-coffee__span">
            {`Weight: ${selectedCoffee?.weight}`}
          </span>
          <span className="selected-coffee__span">
            {`Flavor-Profile: ${selectedCoffee?.flavor_profile}`}
          </span>
        
        <button
          onClick={() => {
            dispatch(actionsModal.setModalBuyActive(true))
        }}
          className="selected-coffee__button yellow-btn">Buy</button>
      </div>
    </div>
        <Footer />
    </div>
  )
}