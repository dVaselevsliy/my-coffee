import { useEffect, useState } from "react";
import { getCoffee } from "../../../api";

export const Header = () => {
  const [coffees, setCoffees] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getCoffee()
      .then(setCoffees)
      .catch(() => {
        setErrorMessage("Error");
      });
  }, []);

  return (
    <header className="header">
      {errorMessage && <p>{errorMessage}</p>}
      
      <div className="header__top">
        <span className="header__bean-scene">Bean Scene</span>

        <div className="header__links">
            <a className="header__link" href="#">Home</a>
            <a className="header__link" href="#">Menu</a>
            <a className="header__link" href="#">About Us</a>
            <a className="header__link" href="#">Contact Us</a>
        </div>

        <div className="header__sign-in">
          <a className="header__sign-in--text-white" href="#">Sign In</a>
          <div className="header__button">
            <a className="header__sign-in--text-black" href="#">SignIn</a>
          </div>
        </div>
      </div>

        <div className="header__main">
        <p className="header__title">We’ve got your morning covered with</p>
        
        <h1 className="header__coffee">Coffee</h1>

        <p className="header__description">
          It is best to start your day with a cup of coffee. Discover the
          best flavours coffee you will ever have. We provide the best
          for our customers.
        </p>

        <div className="header__button additional-indents">
          <a className="header__order-text" href="#">Order Now</a>
        </div>
        </div>

      {/* {coffees.map((coffee) => (
        <p className="header__paragraf" key={coffee.id}>{coffee.name}</p>
      ))} */}
    </header>
  );
};
