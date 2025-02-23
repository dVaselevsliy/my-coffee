import { useEffect, useState } from "react"
import { Carousel } from "./Carousel"
import { getAllProducts } from "../api";
import { ProductCard } from "./ProductCard";
import { Loader } from "./Loader";

export const HomePageSection6 = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts(6)
      .then(setProducts)
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="hp-section-6 section-padding">
      <h2 className="hp-section-6__title title">
        Enjoy a new blend of coffee style
      </h2>
      <p className="hp-section-6_paragraph paragraph">
      Explore all flavours of coffee with us. There is always a new cup worth experiencing
      </p>
      {isLoading
        ? <Loader />
        : <Carousel margin={20}>
            {products.map(product => (
              <ProductCard
                product={product}
                className="carousel-item"
              />
            ))}
          </Carousel>
      }
    </div>
  )
}