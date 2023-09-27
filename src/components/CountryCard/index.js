import './index.css'

const CountryCard = props => {
  const {countryDetail, onRemoveCountry} = props
  const {id, name, imageUrl} = countryDetail

  const onDeleteCountry = () => {
    onRemoveCountry(id)
  }
  return (
    <li className="flag-list">
      <img src={imageUrl} alt="thumbnail" className="country-flag" />
      <div className="remove-button-container">
        <p className="country-card-page-main-heading">{name}</p>
        <button
          className="remove-button"
          onClick={onDeleteCountry}
          type="button"
        >
          Remove
        </button>
      </div>
    </li>
  )
}

export default CountryCard
