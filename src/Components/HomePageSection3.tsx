import gridSquaresItems from '../data/grid-squares.json'

type GridSquareItem = {
  title: string,
  text: string,
  img: string,
  img_alt: string
}

export const HomePageSection3 = () => {

  return (
    <section
      className="hp-section-3 section-padding"
    >
      <h2
        className="hp-section-3__title title"
      >
        Why are we different?
      </h2>
      <p className="hp-section-3__paragraph paragraph">
        We don’t just make your coffee, we make your day!
      </p>
      
      <div className="grid-squares">
        {gridSquaresItems.map((item: GridSquareItem) => (
          <div className="grid-squares__item">
            <img
              className="grid-squares__item__image"
              src={item.img}
              alt={item.img_alt}
            />
            <h5 className="grid-squares__item__title">{item.title}</h5>
            <p className="grid-squares__item__text">{item.text}</p>
          </div>
        ))}
      </div>

      <p className="hp-section-3__sub-paragraph paragraph">
        Great ideas start with great coffee, Lets help you achieve that.
      </p>
      <p className="hp-section-3__sub-title title">
        Get started today.
      </p>
    </section>
  )
} 