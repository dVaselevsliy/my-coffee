interface Props {
  activeSort: string,
  setActiveSort: (activeSort: string) => void
}

export const SelectSort: React.FC<Props> = ({
  activeSort, setActiveSort, 
}) => {
  return (
    <div className="sort">
                <h2 className="filter__text">Sort by:</h2>
                  <select
                    value={activeSort}
                    onChange={(event) => {
                      setActiveSort(event.target.value)
                    }}
                    className="sort__title"
                  >
                    <option
                      value={'all'}
                      className="sort__section">
                      Select sort
                    </option>

                    <option className="sort__section" value={'price-low-high'}>
                        Price low-high
                    </option>

                    <option className="sort__section"
                        value={'price-high-low'}
                      >
                        Price high-low
                    </option>

                    <option className="sort__section"
                      value={'alphabetically-asc'}
                    >
                      Alphabetically
                    </option>

                    <option className="sort__section"
                      value={'alphabetically-desc'}
                    >
                      Alphabetically-reverse
                    </option>
                    
                    <option className="sort__section"
                      value={'roast-level-low-high'}
                    >
                      Roast level low-high
                    </option>

                    <option className="sort__section"
                      value={'roast-level-high-low'}
                    >
                      Roast level high-low
                    </option>
                  </select>
                </div>
  )
}