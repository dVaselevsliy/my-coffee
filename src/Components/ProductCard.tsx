import { NavLink } from "react-router-dom"
import { Coffee } from "../types/Coffee"

type Props = {
  product: Coffee,
  className?: string;
}

export const ProductCard: React.FC<Props> = ({ product, className = '' }) => {

  return (
    <div
      key={product.id}
      className={`product ${className ?? ''}`}
      
    >
      <div className="product__image-container">
        <img className="product__image" src={product.image_url} alt={`${product.name || 'product'}.logo`} />
      </div>
      <h6 className="product__name">{product.name}</h6>
      <p className="product__description">{product.description}</p>
      <span className="product__price">{`$${product.price}`}</span>

      <NavLink
        /* onClick={() => {
          dispatch(actionsCoffee.setSelectedProductId(product.id))
          dispatch(actionsModal.setBuySuccessfully(false))
        }} */
        className="yellow-btn product__button"
        to={`/selected-coffee/${product.id}`}
      >
        Order Now
      </NavLink>

    </div>
  )
}