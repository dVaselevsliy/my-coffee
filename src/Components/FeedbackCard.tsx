import { useEffect, useState } from "react"
import { ReadMore } from "./ReadMore"

type Props = {
  portrait: string
  text: string
  name: string
  position: string
}

export const FeedbackCard: React.FC<Props> = ({
  portrait,
  text,
  name,
  position
}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return (
    <div className="feedback-card carousel-item">
      <img
        className="feedback-card__icon-six"
        src="./six-six.png"
        alt="six-six logo"
      />
      <div className="feedback-card__content">
        <p className="feedback-card__paragraph">
          {screenWidth <= 550 ?
            <ReadMore text={text} />
            : text
          }
        </p>
      </div>
      <div className="feedback-card__person-info">
        <h3 className="feedback-card__person-info__name">
          {name}
        </h3>
        <p className="feedback-card__person-info__position">
          {position}
        </p>
        <img
          className="feedback-card__person-info__portrait"
          src={portrait}
          alt="person photo"
        />
      </div>
    </div>
  )
}