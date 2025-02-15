import React, { useEffect, useMemo, useState } from "react";
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
import { SORT_FIELD, sortArray } from "../helper/sortField";

export const ProductsPage = () => {
  const [, setActiveFilter] = useState(SORT_FIELD.All)
  
  const dispatch = useAppDispatch()
  const { coffee } = useAppSelector(state => state.coffee)
  const { modal } = useAppSelector(state => state.modal)
  
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || ''
  const country = searchParams.get('country') || ''
  const sortAll = searchParams.get('sort') || ''
  
  const [debouncedQuery] = useDebounce(query, 300)

/*   const updateSearchParams = useCallback(
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
  ) */
  
  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    params.set('country', coffee.sortField.toString())

    setSearchParams(params)
  }, [searchParams, setSearchParams, coffee.sortField])
  
  useEffect(() => {
    if (sortAll) {
      if (sortAll.includes('roast-')) {
        dispatch(actionsCoffee.setSort(sortAll.includes('low-high')
          ? 1 : sortAll.includes('high-low')
          ? 2 : ''
        ))
        dispatch(actionsCoffee.setRoastLevelSort(true))
      } else if (sortAll.includes('alphabetically-')) {
        dispatch(actionsCoffee.setSort(sortAll.includes('asc')
          ? 1 : sortAll.includes('desc')
          ? 2 : ''
        ))
        dispatch(actionsCoffee.setAlphabeticallySort(true))
      } else if (sortAll.includes('price-')) {
        dispatch(actionsCoffee.setSort(sortAll.includes('asc')
          ? 1 : sortAll.includes('desc')
          ? 2 : ''))
        dispatch(actionsCoffee.setPriceSort(true))
      }
    }
  }, [searchParams, dispatch, sortAll])

  useEffect(() => {
    if (country) {
      dispatch(actionsCoffee.setSortField(country))
    }
  }, [searchParams, dispatch, country])
    
  useEffect(() => {
    dispatch(init())
  }, [dispatch]);
  
  const coffeeArrayByQuery = useMemo(() => {
    return getPreperedName(coffee.coffee, debouncedQuery, coffee.sortField)
  }, [coffee.coffee, debouncedQuery, coffee.sortField])
  
  const finalyArray = useMemo(() => {
    return getSortCoffee(
      coffeeArrayByQuery, coffee.sort, coffee.priceSort, coffee.alphabeticallySort, coffee.roastLevelSort
    )
  }, [coffeeArrayByQuery, coffee.sort, coffee.priceSort, coffee.alphabeticallySort, coffee.roastLevelSort])


  useEffect(() => {
    if (coffee.sort >= 3) {
      dispatch(actionsCoffee.setSort(0))
      dispatch(actionsCoffee.setPriceSort(false));
      dispatch(actionsCoffee.setAlphabeticallySort(false));
      dispatch(actionsCoffee.setRoastLevelSort(false));

      const params = new URLSearchParams(searchParams)
      params.set('sort', '')
      setSearchParams(params)
    }
  }, [coffee.sort, dispatch, searchParams, setSearchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    if (coffee.roastLevelSort) {
      params.set('sort', coffee.sort === 1
        ? 'roast-low-high' : coffee.sort === 2
          ? 'roast-high-low' : '')
    } else if (coffee.alphabeticallySort) {
      params.set('sort', coffee.sort === 1
        ? 'alphabetically-asc' : coffee.sort === 2
        ? 'alphabetically-desc' : '')
    } else if (coffee.priceSort) {
      params.set('sort', coffee.sort === 1
        ? 'price-asc' : coffee.sort === 2
        ? 'price-desc' : '')
    } else {
      params.delete('sort')
    }

    setSearchParams(params)
  }, [coffee.sort, coffee.roastLevelSort, coffee.alphabeticallySort, coffee.priceSort, searchParams, setSearchParams])

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams)

    if (event.target.value) {
      params.set('query', event.target.value)
    } else {
      params.delete('query')
    }
    setSearchParams(params)
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
                            setActiveFilter(sort.id)
                            dispatch(actionsCoffee.setSortField(sort.id))
                          }}
                          className={`filter__button ${coffee.sortField === sort.id && 'button-active'}`}>
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
                            dispatch(actionsCoffee.setSort(0))
                            dispatch(actionsCoffee.setAlphabeticallySort(false));
                            dispatch(actionsCoffee.setRoastLevelSort(false));
                            dispatch(actionsCoffee.setPriceSort(false))
                            return
                        }
                        dispatch(actionsCoffee.setSort(coffee.sort + 1))
                        dispatch(actionsCoffee.setPriceSort(true))
                      }}
                    >
                      <strong
                        className="sort__option">
                        Price
                      </strong>
                      <img className={`sort__arrow ${
                        coffee.sort === 2 && coffee.priceSort && 'sort__arrow--up'
                        } ${
                        coffee.sort === 1 && coffee.priceSort && 'sort__arrow--down'
                        }`} src="./arrow.png" alt="" />
                    </div>
                    <div className="sort__section"
                      onClick={() => {
                        if (coffee.priceSort || coffee.roastLevelSort) {
                            dispatch(actionsCoffee.setSort(0))
                            dispatch(actionsCoffee.setPriceSort(false))
                            dispatch(actionsCoffee.setRoastLevelSort(false))
                            return
                        }
                        dispatch(actionsCoffee.setAlphabeticallySort(true));
                        dispatch(actionsCoffee.setSort(coffee.sort + 1))
                      }}
                    >
                      <strong
                      className="sort__option"
                      >
                        Alphabetically
                      </strong>
                      <img className={`sort__arrow ${
                        coffee.sort === 2 && coffee.alphabeticallySort && 'sort__arrow--up'
                        } ${
                          coffee.sort === 1 && coffee.alphabeticallySort && 'sort__arrow--down'
                        }`} src="./arrow.png" alt="" />
                    </div>
                    <div className="sort__section"
                      onClick={() => {
                        if (coffee.priceSort || coffee.alphabeticallySort) {
                          dispatch(actionsCoffee.setSort(0))
                          dispatch(actionsCoffee.setPriceSort(false))
                          dispatch(actionsCoffee.setAlphabeticallySort(false))
                          return
                        }
                        dispatch(actionsCoffee.setRoastLevelSort(true))
                        dispatch(actionsCoffee.setSort(coffee.sort + 1))
                      }}
                    >
                      <strong className="sort__option">Roast Level</strong>
                      <img className={`sort__arrow ${
                        coffee.sort === 2 && coffee.roastLevelSort && 'sort__arrow--up'
                        } ${
                        coffee.sort === 1 && coffee.roastLevelSort && 'sort__arrow--down'
                        }`} src="./arrow.png" alt="" />
                    </div>
                  </div>
                </div>
              </div> 
            </form>
          </div>
        </div>

        {coffee.loading ? (
            <Loader />
        ) : (
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
                <NavLink className="header__order-text" to={`/selected-coffee/${coffee.id}`}>Order Now</NavLink>
              </div>
            </div>
        ))}
        </main>
        )}

      </div>

      {!coffee.loading && (
        <Footer />
      )}
</>
  )
}