import React, { useEffect, useMemo, useState } from "react";
import { Header } from "../Components/Header";
import { Loader } from "../Components/Loader";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { actions as actionsCoffee, init } from "../reducers/coffeeArray";
import { getPreperedName } from "../helper/getPreperedName";
import { getSortCoffee } from "../helper/getSortCoffee";
import { ModalWindow } from "../Components/ModalWindow";
import { useSearchParams } from "react-router-dom";

import { Footer } from "../Components/Footer";
import { useDebounce } from "use-debounce";
import { SORT_FIELD, sortArray } from "../helper/sortField";
import { getActiveSort } from "../helper/getActiveSort";
import { SelectSort } from "../Components/SelectSort";
import { ProductCard } from "../Components/ProductCard";

export const ProductsPage = () => {
  const [, setActiveFilter] = useState(SORT_FIELD.All)
  const [activeCountry, setActiveCountry] = useState(SORT_FIELD.All)
  const [activeSort, setActiveSort] = useState('all')
  
  const dispatch = useAppDispatch()
  const { coffee } = useAppSelector(state => state.coffee)
  const { modal } = useAppSelector(state => state.modal)
  
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || ''
  const sortFromParams = searchParams.get("sort") || '';
  const countryFromParams = searchParams.get("country") || '';

  const [debouncedQuery] = useDebounce(query, 300)

  useEffect(() => {
    getActiveSort(activeSort, dispatch, actionsCoffee)
  }, [activeSort, dispatch])

    
  useEffect(() => {
    dispatch(init())
  }, [dispatch]);
  
  const coffeeArrayByQuery = useMemo(() => {
    return getPreperedName(coffee.coffee, debouncedQuery, coffee.sortField)
  }, [coffee.coffee, debouncedQuery, coffee.sortField])
  
  const finalyArray = useMemo(() => {
    return getSortCoffee(coffeeArrayByQuery, activeSort)
  }, [coffeeArrayByQuery, activeSort])

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams)

    if (event.target.value) {
      params.set('query', event.target.value)
    } else {
      params.delete('query')
    }
    setSearchParams(params)
  }

  useEffect(() => {
    if (sortFromParams) {
      setActiveSort(sortFromParams)
    } else {
      setActiveSort('all')
    }
  
    if (countryFromParams) {
      dispatch(actionsCoffee.setSortField(countryFromParams));
      setActiveCountry(countryFromParams);
    }
  }, [dispatch, searchParams, countryFromParams, sortFromParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
  
    if (coffee.sortField) {
      params.set("country", coffee.sortField);
    } else {
      params.delete("country");
    }
  
    if (activeSort) {
      params.set("sort", activeSort);
    } else {
      params.delete("sort");
    }
  
    setSearchParams(params);
  }, [activeSort, searchParams, setSearchParams, coffee.sortField]);

  return (
    <>
      <div className="header__dark-theme">
        <Header />
      </div>
      {modal.modalActive &&
        <ModalWindow />
      }
      {coffee.error && <p className="menu__error">{coffee.error}</p>}

      <div className="menu--header section-padding">
        <div className="menu--header--text">
          <h2 className="title menu__title">
            Enjoy a new blend of coffee style
          </h2>
          <p className="menu__under-title">
            Explore all flavours of coffee with us. There is always a new cup worth experiencing
          </p>

          <form className="menu--header__field">
            <div className="menu--header__query-field">
              <label className="menu--header__title" htmlFor="title">
                Search by name:
              </label>
              <div>
                <input
                  className="menu--header__input input min-width"
                  type="text"
                  id="title"
                  placeholder="Write product name here"
                  value={query}
                  onChange={handleQueryChange}
                />
              </div>
            </div>

            <div className="filter">
              <h2 className="filter__text">Filter by country:</h2>
              <select
                className="filter__option"
                value={activeCountry}
                onChange={(event) => {
                  setActiveCountry(event.target.value)
                  setActiveFilter(event.target.value)
                  dispatch(actionsCoffee.setSortField(event.target.value))
                }}
              >
                {sortArray.map(sort => (
                  <option
                    key={sort.id}
                    className={`filter__button ${coffee.sortField === sort.id && 'button-active'}`}>
                    {sort.name}
                  </option>
                ))}
              </select>
            </div>
            <SelectSort
              activeSort={activeSort}
              setActiveSort={setActiveSort} />
          </form>

        </div>

        {coffee.loading ? (
          <Loader />
        ) : (
          <main className="menu">
            {finalyArray.map((coffee) => (
              <ProductCard
                product={coffee}
              />
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