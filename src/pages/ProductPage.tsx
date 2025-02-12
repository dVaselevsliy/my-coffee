import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Header } from "../Components/Header";
import { Loader } from "../Components/Loader";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { actions as actionsCoffee, init } from "../reducers/coffeeArray";
import { getPreperedName } from "../helper/getPreperedName";
import { getSortCoffee } from "../helper/getSortCoffee";
import { ModalWindow } from "../Components/ModalWindow";
import { NavLink, useSearchParams } from "react-router-dom";
import { actions as actionsModal } from "../reducers/modalContent";
import { Footer } from "../Components/Footer";
import { useDebounce } from "use-debounce";

type SortFieldType = {
  All: string;
  CentralAmerica: string;
  Africa: string;
  SouthAmerica: string;
  AsiaPacific: string;
  MiddleEast: string;
}

export const SORT_FIELD: SortFieldType = {
  All: 'all',
  CentralAmerica: 'Central America',
  Africa: 'Africa',
  SouthAmerica: 'South America',
  AsiaPacific: 'Asia Pacific',
  MiddleEast: 'Middle East'
}

const sortArray = [
  {
    name: 'All',
    searchParamsName: 'All',
    id: SORT_FIELD.All
  },
  {
    name: 'Central America',
    searchParamsName: 'CentralAmerica',
    id: SORT_FIELD.CentralAmerica
  },
  {
    name: 'Africa',
    searchParamsName: 'Africa',
    id: SORT_FIELD.Africa
  },
  {
    name: 'South America',
    searchParamsName: 'SouthAmerica',
    id: SORT_FIELD.SouthAmerica
  },
  {
    name: 'Asia Pacific',
    searchParamsName: 'AsiaPacific',
    id: SORT_FIELD.AsiaPacific
  },
  {
    name: 'Middle East',
    searchParamsName: 'MiddleEast',
    id: SORT_FIELD.MiddleEast
  },
]

export const ProductsPage = () => {
  const [query, setQuery] = useState('')
  const [sortField, setSortField] = useState(SORT_FIELD.All)
  const [activeFilter, setActiveFilter] = useState(SORT_FIELD.All)

  const [debouncedQuery] = useDebounce(query, 300)
  
  const [sort, setSort] = useState(0)

  const dispatch = useAppDispatch()
  const { coffee } = useAppSelector(state => state.coffee)
  const { modal } = useAppSelector(state => state.modal)

  const [, setSearchParams] = useSearchParams();

  const updateSearchParams = useCallback(
    (newParams: Record<string, string | string[]>) => {
      setSearchParams((prevParams) => {
        const params = new URLSearchParams(prevParams)
    
        Object.entries(newParams).forEach(([key, value]) => {
          if (!value) {
            params.delete(key)
          } else if (Array.isArray(value)) {
            params.delete(key)
            value.forEach(item => params.append(key, item.toString()))
          } else {
            params.set(key, value.toString())
          }
        })
  
        return params
      })
    }, [setSearchParams]
  )
    


  
  useEffect(() => {
    dispatch(init())
  }, [dispatch]);
  
  const coffeeArrayByQuery = useMemo(() => {
    return getPreperedName(coffee.coffee, debouncedQuery, sortField)
  }, [coffee.coffee, debouncedQuery, sortField])
  
  const finalyArray = useMemo(() => {
    return getSortCoffee(
      coffeeArrayByQuery, sort, coffee.priceSort, coffee.alphabeticallySort, coffee.roastLevelSort
    )
  }, [coffeeArrayByQuery, sort, coffee.priceSort, coffee.alphabeticallySort, coffee.roastLevelSort])


  useEffect(() => {
    if (sort >= 3) {
      setSort(0);
      dispatch(actionsCoffee.setPriceSort(false));
      dispatch(actionsCoffee.setAlphabeticallySort(false));
      dispatch(actionsCoffee.setRoastLevelSort(false));
    }
  }, [sort, dispatch]);

  useEffect(() => {
    const sortParams = {
      roastLevelSort: coffee.roastLevelSort ? (sort === 1 ? 'low-high' : 'high-low') : '',
      alphabeticallySort: coffee.alphabeticallySort ? (sort === 1 ? 'yes' : 'reverse') : '',
      priceSort: coffee.priceSort ? (sort === 1 ? 'low-high' : 'high-low') : ''
    }

    updateSearchParams(sortParams)
  }, [sort, coffee.roastLevelSort, coffee.alphabeticallySort, coffee.priceSort, updateSearchParams])

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchParams({query: `${event.target.value}`})
    setQuery(event.target.value)
  }

  return (
    <>
      <div className="header__dark-theme">
        <Header />
      </div>
      {modal.modalActive && 
        <ModalWindow />
      }
      {coffee.error && <p className="menu__error">{coffee.error}</p>}

      <div className="menu--header">
        <div className="menu--header--text">
          <h2 className="menu__title">Enjoy a new blend of coffee style</h2>
          <p className="menu__under-title">Explore all flavours of coffee with us. There is always a new cup worth experiencing</p>

          <div className="menu--header__form">
            <form>
              <div className="menu--header__field">
                <div className="menu--header__query-field">
                  <label className="menu--header__title" htmlFor="title">Product Name:</label>
                  <div>
                    <input
                      className="input is-normal min-width width-on-phone"
                      type="text"
                      id="title"
                      placeholder="Write product name here"
                      value={query}
                      onChange={handleQueryChange}
                    />
                  </div>
                </div>

                  <div className="filter">
                    <div className="filter__option">
                    {sortArray.map(sort => (
                        <button
                            key={sort.id}                        
                            onClick={() => {
                            updateSearchParams({country: `${sort.searchParamsName}`})  
                            setActiveFilter(sort.id)
                            setSortField(sort.id)
                          }}
                          className={`filter__button ${activeFilter === sort.id && 'button-active'}`}>
                          {sort.name}
                        </button>
                    ))}
                    </div>
                </div>
                <div className="sort">
                  <h5 className="sort__title">
                    Sort by:
                  </h5>
                  <div className="sort__container">
                    <div className="sort__section"
                      onClick={() => {
                        if (coffee.alphabeticallySort || coffee.roastLevelSort) {
                            setSort(0)
                            dispatch(actionsCoffee.setAlphabeticallySort(false));
                            dispatch(actionsCoffee.setRoastLevelSort(false));
                            dispatch(actionsCoffee.setPriceSort(false))
                            return
                        }
                        setSort(sort + 1)
                        dispatch(actionsCoffee.setPriceSort(true))
                      }}
                    >
                      <strong
                        className="sort__option">
                        Price
                      </strong>
                      <img className={`sort__arrow ${
                        sort === 2 && coffee.priceSort && 'sort__arrow--up'
                        } ${
                        sort === 1 && coffee.priceSort && 'sort__arrow--down'
                        }`} src="./arrow.png" alt="" />
                    </div>
                    <div className="sort__section"
                      onClick={() => {
                        if (coffee.priceSort || coffee.roastLevelSort) {
                          return (
                            setSort(0),
                            dispatch(actionsCoffee.setPriceSort(false)),
                            dispatch(actionsCoffee.setRoastLevelSort(false))
                          )
                        }
                        dispatch(actionsCoffee.setAlphabeticallySort(true));
                        setSort(sort + 1)
                      }}
                    >
                      <strong
                      className="sort__option"
                      >
                        Alphabetically
                      </strong>
                      <img className={`sort__arrow ${
                        sort === 2 && coffee.alphabeticallySort && 'sort__arrow--up'
                        } ${
                        sort === 1 && coffee.alphabeticallySort && 'sort__arrow--down'
                        }`} src="./arrow.png" alt="" />
                    </div>
                    <div className="sort__section"
                      onClick={() => {
                        if (coffee.priceSort || coffee.alphabeticallySort) {
                          return (
                            setSort(0),
                            dispatch(actionsCoffee.setPriceSort(false)),
                            dispatch(actionsCoffee.setAlphabeticallySort(false))
                          )
                        }
                        dispatch(actionsCoffee.setRoastLevelSort(true))
                        setSort(sort + 1)
                      }}
                    >
                      <strong className="sort__option">Roast Level</strong>
                      <img className={`sort__arrow ${
                        sort === 2 && coffee.roastLevelSort && 'sort__arrow--up'
                        } ${
                        sort === 1 && coffee.roastLevelSort && 'sort__arrow--down'
                        }`} src="./arrow.png" alt="" />
                    </div>
                  </div>
                </div>
              </div> 
            </form>
          </div>
        </div>

        {coffee.loading && (
            <Loader />
          )}

        <main className="menu">
      {finalyArray.map((coffee) => (
        <div className="product" key={coffee.id}>
          <div className="product__image-container">
            <img className="product__image" src={coffee.image_url} alt={`${coffee.name || 'product'}.logo`} />
          </div>
          <h6 className="product__name">{coffee.name}</h6>
          <p className="product__description">{coffee.description}</p>
          <span className="product__price">{`$${coffee.price}`}</span>

          <div
            onClick={() => {
              dispatch(actionsCoffee.setSelectedProductId(coffee.id))
              dispatch(actionsModal.setBuySuccessfully(false))
            }}
            className="header__button additional-indents absolute">
            <NavLink className="header__order-text" to={`/selected-coffee/id=${coffee.id}`}>Order Now</NavLink>
          </div>
        </div>
    ))}
    </main>
      </div>
      {!coffee.loading && (
        <Footer />
      )}
</>
  )
}