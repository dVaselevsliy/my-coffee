import { NavLink } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

export const AboutUsPage = () => {

  const [translateX, setTranslateX] = useState(0)

  const windowSize = useRef(window.innerWidth)
  const [changeWidth, setChangeWidth] = useState(false) 

  console.log(windowSize);
  
  const handleLeftClick = () => {
    setChangeWidth(true)
    if (windowSize.current > 1200) {
      setTranslateX((prev) => prev - 1080 < 0 ? 0 : prev - 1080)
    } else if (windowSize.current > 720) {
      setTranslateX((prev) => prev - 600 < 0 ? 0 : prev - 600)
    } else {
      setTranslateX((prev) => prev - 341 < 0 ? 0 : prev - 341)
    }
  }

  const handleRightClick = () => {
    setChangeWidth(true)
    if (windowSize.current > 1200) {
      setTranslateX((prev) => prev + 1080 > 1080 * 2 ? 1080 * 2 : prev + 1080)
    } else if (windowSize.current > 720) {
      setTranslateX((prev) => prev + 600 > 600 * 2 ? 600 * 2 : prev + 600)
    } else {
      setTranslateX((prev) => prev + 341 > 341 * 2 ? 341 * 2 : prev + 341)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setChangeWidth(false)
      windowSize.current = window.innerWidth
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [changeWidth])
  
  return (
    <>
      <div className="about-us section-padding" id="about-us">
        <div className="about-us__title">
          <h2 className="about-us__h2 title">Discover the best coffee</h2>
          <p className='about-us__paragraf'>Bean Scene is a coffee shop that provides you with quality coffee that helps boost your productivity and helps build your mood. Having a cup of coffee is good, but having a cup of real coffee is greater. There is no doubt that you will enjoy this coffee more than others you have ever tasted.</p>
          <a
            className="yellow-btn about-us__button"
            href="https://en.wikipedia.org/wiki/Coffee"
            target="_blank"
          >Learn More
          </a>
        </div>
        <img className="about-us__image" src='./coffee-image.png' alt="coffee-image" />
      </div>
        <div className="why-we-different">
            <img className="why-we-different__coffee-image" src='./coffee-blast.png' alt="coffee-image" />
            <h2 className="title why-we-different__margin">Why are we different?</h2>
            <p className="why-we-different__text about-us__paragraf">We don’t just make your coffee, we make your day!</p>
      </div>
      
      <div className="section section-padding">
        <div className="section__container">
          <img className="section__image" src='./coffee-beans.png' alt="coffee-beans" />
            <h5 className="section__title">Supreme Beans</h5>
            <p className="section__text">Beans that provides great taste</p>
        </div>

        <div className="section__container">
          <img className="section__image" src='./badge.png' alt="badge" />
            <h5 className="section__title">High Quality</h5>
            <p className="section__text">We provide the highest quality</p>
        </div>

        <div className="section__container">
          <img className="section__image" src='./coffee-cup.png' alt="coffee-cup" />
            <h5 className="section__title">Extraordinary</h5>
            <p className="section__text">Coffee like you have never tasted</p>
        </div>

        <div className="section__container">
          <img className="section__image" src='./best-price.png' alt="best-price" />
            <h5 className="section__title">Affordable Price</h5>
            <p className="section__text">Our Coffee prices are easy to afford</p>
        </div>
      </div>

      <div className="start">
        <p className="start__text">Great ideas start with great coffee, Lets help you achieve that.</p>
        <h5 className="title start__title">Get started today.</h5>
      </div>

      <div className="order-section section-padding">
          <div className="order-section__text">
          <h2 className="title order-section__text--title">
            Get a chance to have an <br/> Amazing morning
          </h2>
            <p className="order-section__text--paragraf">We are giving you are one time opportunity to
              experience a better life with coffee.</p>
              <NavLink className="yellow-btn order-section__button" to="/menu">Order Now</NavLink>
      
          </div>

          <img className="order-section__coffee-cup" src="./cup.png" alt="coffee-cup" />

      </div>
      <div className="about-us-carousel section-padding">
        <h2 className="title why-we-different__heading">Our coffee perfection feedback</h2>
        <p className="why-we-different__text about-us__paragraf">Our customers have amazing things to say about us</p>
        
        <div className="about-us-carousel__wrapper">
        <div style={{
          transform: `translateX(-${translateX}px)`
        }}
          className="about-us-carousel__container">
          <div className="item">
            <img className="about-us-carousel__icon-six" src="./six-six.png" alt="six-six logo" />
            <div className="about-us-carousel__content">
              <p className="about-us-carousel__paragraf">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset.....</p>
            </div>
            <div className="about-us-carousel__person-info">
              <h3 className="why-we-different__title about-us-carousel__name">Jonny Thomas</h3>
              <p className="why-we-different__text about-us-carousel__position">Project Manager</p>
              <img className="about-us-carousel__person-photo" src="./man-1.jpg" alt="person photo" />
            </div>
          </div>

            <div className="item">
              <img className="about-us-carousel__icon-six" src="./six-six.png" alt="six-six logo" />
              <div className="about-us-carousel__content">
                <p className="about-us-carousel__paragraf">World's simplest online Portable Network Graphics (PNG) background adder. Just import your PNG image in the editor on the left and you'll instantly get a PNG with a new background on the right. Free, quick, and very powerful. Import a transparent PNG – create a PNG with a background. Created with love by team Browserling.</p>
              </div>
              <div className="about-us-carousel__person-info">
                <h3 className="why-we-different__title about-us-carousel__name">Ryan Gosling</h3>
                <p className="why-we-different__text about-us-carousel__position">Driver</p>
                <img className="about-us-carousel__person-photo" src="./man-2.jpg" alt="person photo" />
              </div>
            </div>
          
          <div className="item">
            <img className="about-us-carousel__icon-six" src="./six-six.png" alt="six-six logo" />
            <div className="about-us-carousel__content">
              <p className="about-us-carousel__paragraf">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset.....</p>
            </div>
            <div className="about-us-carousel__person-info">
              <h3 className="why-we-different__title about-us-carousel__name">Jonny Thomas</h3>
              <p className="why-we-different__text about-us-carousel__position">Project Manager</p>
              <img className="about-us-carousel__person-photo" src="./man-3.jpg" alt="person photo" />
            </div>
            </div>
          </div>
        </div>      
        
        
        <button
          onClick={handleLeftClick}
          className="about-us-carousel__button left">
          <img className="about-us-carousel__arrow-icon" src="./arrow-left.png" alt="arrow-left.png" />
        </button>

        <button
          onClick={handleRightClick}
          className="about-us-carousel__button right">
          <img className="about-us-carousel__arrow-icon" src="./arrow-rigth.png" alt="arrow-rigth.png" />
        </button>
      </div>
    </>
  )
}