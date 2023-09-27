import {Component} from 'react'
import CountryCard from '../CountryCard'
import './index.css'

class Country extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initialCountriesList: props.initialCountriesList,
      countryFlagList: props.initialCountriesList.filter(
        item => item.isVisited === true,
      ),
    }
  }

  onVisitingCountry = id => {
    this.setState(prevState => {
      const updatedList = prevState.initialCountriesList.map(item => {
        if (item.id === id) {
          return {...item, isVisited: true}
        }
        return item
      })
      const visitedCountryItem = prevState.initialCountriesList.find(
        item => item.id === id,
      )
      return {
        initialCountriesList: updatedList,
        countryFlagList: [
          ...prevState.countryFlagList,
          {...visitedCountryItem, imageUrl: visitedCountryItem.imageUrl},
        ],
      }
    })
  }

  onRemoveCountry = id => {
    const {countryFlagList, initialCountriesList} = this.state
    const updatedList = initialCountriesList.map(item => {
      if (item.id === id) {
        return {...item, isVisited: false}
      }
      return item
    })
    const filteredCountryList = countryFlagList.filter(item => item.id !== id)
    this.setState({
      countryFlagList: filteredCountryList,
      initialCountriesList: updatedList,
    })
  }

  render() {
    const {initialCountriesList, countryFlagList} = this.state
    return (
      <div className="background-container">
        <h1 className="country-page-main-heading">Countries</h1>
        <ul className="table">
          {initialCountriesList.map(item => (
            <li key={item.id} className="table-row">
              <p className="country-name">{item.name}</p>
              {!item.isVisited && (
                <button
                  type="button"
                  className="visit-button"
                  onClick={() => this.onVisitingCountry(item.id)}
                >
                  Visit
                </button>
              )}
              {item.isVisited && <p className="visited-paragraph">Visited</p>}
            </li>
          ))}
        </ul>
        <div>
          <h1 className="country-page-main-heading">Visited Countries</h1>
          {countryFlagList.length !== 0 ? (
            <ul className="unordered-country-detail-list">
              {countryFlagList.map(item => (
                <CountryCard
                  countryDetail={item}
                  key={item.id}
                  onRemoveCountry={this.onRemoveCountry}
                />
              ))}
            </ul>
          ) : (
            <div className="no-country-visited-container">
              <p className="no-country-visited-heading">
                No Countries Visited Yet
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Country
