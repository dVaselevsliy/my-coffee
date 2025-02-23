import React, { useRef, useState } from "react";

type Props = {
  children?: React.ReactNode,
  margin?: number
}

export const Carousel: React.FC<Props> = ({ children, margin = 0 }) => {
  const carousel = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);

  const handleClick = (direction: 'right' | 'left') => {
    if (!carousel.current) return;

    const carouselItem = carousel.current.querySelector('.carousel-item') as HTMLDivElement | null;

    if (carouselItem) {
      const itemWidth = carouselItem.clientWidth + 2 + margin; /* include borders */

      setTranslateX((prev) => {
        let newValue = prev;

        if (direction === 'right') {
          newValue = prev + itemWidth > itemWidth * 2
            ? itemWidth * 2
            : prev + itemWidth;
        } else if (direction === 'left') {
          newValue = prev - itemWidth < 0
            ? 0
            : prev - itemWidth;
        }

        return newValue;
      });
    }
  };

  return (
    <div className="carousel" ref={carousel}> {/* for buttons positioning*/}
      <div className="carousel__wrapper"> {/* for hiding carousel items */}
        <div
          style={{ transform: `translateX(-${translateX}px)` }}
          className="carousel__container"
        >
          {children}
        </div>
      </div>
      
      <button onClick={() => handleClick('left')} className="carousel__button left">
        <img className="carousel__arrow-icon" src="./arrow-left.png" alt="arrow-left" />
      </button>

      <button onClick={() => handleClick('right')} className="carousel__button right">
        <img className="carousel__arrow-icon" src="./arrow-right.png" alt="arrow-right" />
      </button>
    </div>
  );
};
