import { NavLink } from "react-router-dom"

export const HomePageSection4 = () => {
  
  return (
    <div className="hp-section-4 section-padding">
      <div className="hp-section-4__text">
        <h2 className="title order-section__text--title white-color">
          Get a chance to have an <br/> Amazing morning
        </h2>
        <p className="hp-section-4__text--paragraph">
          We are giving you are one time opportunity to experience a better life with coffee.
        </p>
        <NavLink
          className="yellow-btn hp-section-4__button"
          to="/menu"
        >
          Order Now
        </NavLink>

      </div>

      <img className="hp-section-4__coffee-cup" src="./cup.png" alt="coffee-cup" />
  </div>
  )
}