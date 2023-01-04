import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    error: '',
    appointmentsList: [],
    isStarredActive: false,
    initialList: [],
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {title, date, appointmentsList} = this.state

    if (title !== '' && date !== '') {
      const formattedDate = format(new Date(date), 'dd MMMM yyyy EEEE')
      const appointmentItem = {
        title,
        formattedDate,
        id: uuidv4(),
        isStarred: false,
      }

      const updatedList = [...appointmentsList, appointmentItem]
      this.setState({
        appointmentsList: updatedList,
        title: '',
        date: '',
        error: '',
      })
    } else {
      this.setState({error: 'Enter Required Fields'})
    }
  }

  onChangeTile = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  updateStarStatus = id => {
    const {appointmentsList} = this.state
    const updatedList = appointmentsList.map(appointmentItem => {
      if (appointmentItem.id === id) {
        return {
          ...appointmentItem,
          isStarred: !appointmentItem.isStarred,
        }
      }
      return appointmentItem
    })

    this.setState({appointmentsList: updatedList})
  }

  onClickStarredButton = () => {
    console.log(1)
    const {appointmentsList, isStarredActive, initialList} = this.state

    if (!isStarredActive) {
      const updatedList = appointmentsList.filter(
        appointmentItem => appointmentItem.isStarred,
      )
      this.setState({
        appointmentsList: updatedList,
        initialList: appointmentsList,
        isStarredActive: true,
      })
    } else {
      this.setState({appointmentsList: initialList, isStarredActive: false})
    }
  }

  render() {
    const {title, date, error, appointmentsList} = this.state
    return (
      <div className="app-container">
        <div className="appointment-container">
          <h1>Add Appointment</h1>
          <div className="form-image-container">
            <form className="form-container" onSubmit={this.onAddAppointment}>
              <div className="input-container">
                <label className="label" htmlFor="title">
                  TITLE
                </label>
                <input
                  onChange={this.onChangeTile}
                  className="input"
                  id="title"
                  type="text"
                  value={title}
                  placeholder="Title"
                />
              </div>
              <div className="input-container">
                <label className="label" htmlFor="date">
                  DATE
                </label>
                <input
                  onChange={this.onChangeDate}
                  className="input"
                  id="date"
                  type="date"
                  value={date}
                />
              </div>
              <button type="submit" className="button">
                Add
              </button>
              <p className="error">{error}</p>
            </form>

            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-img"
            />
          </div>

          <hr className="h-line" />
          <div className="appointments-head-starred-container">
            <h1>Appointments</h1>
            <button
              onClick={this.onClickStarredButton}
              type="button"
              className="starred-button"
            >
              Starred
            </button>
          </div>
          <ul className="appointment-items-container">
            {appointmentsList.map(appointmentItem => (
              <AppointmentItem
                key={appointmentItem.id}
                appointmentItem={appointmentItem}
                updateStarStatus={this.updateStarStatus}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
