import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import leftCup from '../images/coffee-cup-left.png'

export const Footer = () => {
  const [queryEmail, setQueryEmail] = useState('')
  const [subscribe, setSubscribe] = useState(false)
  
  const reset = () => {
    setQueryEmail('')
  }

  const handleUpdateSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (queryEmail.length === 0) {
      return
    }

    setSubscribe(true)
    reset()
  }
  
  return (
    <footer>
        {!subscribe && (
      <div className="footer">
        <div className="footer__container">
          <h2 className="title footer__title">Subscribe to get the Latest News</h2>
          <p className="footer__paragraf">Don’t miss out on our latest news, updates, tips and special offers</p>

          <div className="footer__input-box">
            <form className="footer__form" onSubmit={handleUpdateSubmit}>
              <input
                value={queryEmail}
                onChange={(event) => {
                  setQueryEmail(event.target.value)
                }}
                placeholder="Enter your mail"
                className="footer__input"
                type="email"
              />
              <button className="footer__bottom">Suscribe</button>
            </form>
            <img className="footer__coffee-cup-left" src={leftCup} alt="coffee-cup png" />
            <img className="footer__coffee-cup-rigth" src="./coffee-cup-rigth.png" alt="coffee-cup png" />
          </div>
        </div>
      </div>
        )}
      <div className="footer-down">
        <div className="footer-down__section">
          <div className="footer-down__first-column">
            <div className="footer-down__first-column--container">
              <span className="header__bean-scene bump-logo">Bean Scene</span>
              <p className="footer-down__paragraf">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              <div className="footer-down__icons">
                <a className="footer-down__icon" href="https://www.facebook.com/facebook/?locale=uk_UA" target="_blank">
                  <img src="./facebook.png" alt="facebook icon" />
                </a>

                <a className="footer-down__icon" href="https://www.instagram.com" target="_blank">
                  <img src="./instagram.png" alt="instagram icon" />
                </a>

                <a className="footer-down__icon" href="https://www.youtube.com" target="_blank">
                  <img src="./youtube.png" alt="youtube icon" />
                </a>
                
                <a className="footer-down__icon" href="https://x.com/?lang=uk" target="_blank">
                  <img src="./twitter.png" alt="twitter icon" />
                </a>  
            </div>
            </div>
          </div>

            <div className="footer-down__third-column" id="contacts">
              <h5 className="footer-down__third-column--title">Contact Us</h5>

              <span className="footer-down__third-column--section">Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</span>
              <a className="footer-down__third-column--section" href="tel:+1 202-918-2132">+1 202-918-2132</a>
              <a className="footer-down__third-column--section" href="mailto:beanscene@mail.com">beanscene@mail.com</a>
              <a className="footer-down__third-column--section" href="https://www.beanscene.com" target="_blank">www.beanscene.com</a>
          </div>
        </div>
      </div>
    </footer>
  )
}