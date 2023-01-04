import './index.css'

const AppointmentItem = props => {
  const {appointmentItem, updateStarStatus} = props
  const {title, formattedDate, isStarred, id} = appointmentItem

  const onClickStarButton = () => {
    updateStarStatus(id)
  }

  const starUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-item">
      <div className="item-head-star-container">
        <p className="item-title">{title[0].toUpperCase() + title.slice(1)}</p>
        <button
          onClick={onClickStarButton}
          type="button"
          className="star-button"
          data-testid="star"
        >
          <img src={starUrl} alt="star" className="star" />
        </button>
      </div>
      <p className="appointment-date">{`Date: ${formattedDate}`}</p>
    </li>
  )
}

export default AppointmentItem
