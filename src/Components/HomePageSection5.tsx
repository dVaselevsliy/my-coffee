import { Carousel } from "./Carousel"
import { FeedbackCard } from "./FeedbackCard"

export const HomePageSection5 = () => {

  return (
    <div className="hp-section-5 section-padding">
      <h2 className="hp-section-5__title title">Our coffee perfection feedback</h2>
      <p className="hp-section-5_paragraph paragraph">Our customers have amazing things to say about us</p>
      <Carousel>
        <FeedbackCard
          text={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset.....`}
          name={`Jonny Thomas`}
          position={`Project Manager`}
          portrait={"./man-1.jpg"}
        />

        <FeedbackCard
          text={`World's simplest online Portable Network Graphics (PNG) background adder. Just import your PNG image in the editor on the left and you'll instantly get a PNG with a new background on the right. Free, quick, and very powerful. Import a transparent PNG – create a PNG with a background. Created with love by team Browserling.`}
          name={`Santi Cazorla`}
          position={`Driver`}
          portrait={"./man-2.jpg"}
        />

        <FeedbackCard
          text={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset.....`}
          name={` Alexis Sánchez`}
          position={`Project Manager`}
          portrait={"./man-3.jpg"}
        />
      </Carousel>
    </div>
  )
}