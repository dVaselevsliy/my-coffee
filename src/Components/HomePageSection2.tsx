export const HomePageSection2 = () => {

  return (
    <section
      id="about-us"
      className="hp-section-2 section-padding"
    >
      <div className="hp-section-2__text-block">
        <h2 className="hp-section-2__h2 title">
          Discover the best coffee
        </h2>
        <p className='hp-section-2__paragraph paragraph'>
          Bean Scene is a coffee shop that provides you with quality coffee that helps boost your productivity and helps build your mood. Having a cup of coffee is good, but having a cup of real coffee is greater. There is no doubt that you will enjoy this coffee more than others you have ever tasted.
        </p>
          <a
            className="hp-section-2__button yellow-btn"
            href="https://en.wikipedia.org/wiki/Coffee"
            target="_blank"
        >
          Learn More
        </a>
      </div>

      <img
        className="about-us__image"
        src='./coffee-image.png'
        alt="coffee-image"
      />
    </section>
  )
} 