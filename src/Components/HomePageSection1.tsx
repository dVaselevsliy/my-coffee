import { NavLink } from "react-router-dom"

export const HomePageSection1 = () => {

  return (
    <section className="hp-section-1">
      <div className="hp-section-1__overlay" />

      <div className="hp-section-1__main section-padding">
        <p className="hp-section-1__title">
          We’ve got your morning covered with
        </p>
        
        <h1 className="hp-section-1__coffee">Coffee</h1>

        <p className="hp-section-1__description">
          It is best to start your day with a cup of coffee. Discover the
          best flavours coffee you will ever have. We provide the best
          for our customers.
        </p>

        <NavLink
          className="yellow-btn hp-section-1__btn"
          to="/menu"
        >
          Order Now
        </NavLink>
      </div>
    </section>
  )
} 