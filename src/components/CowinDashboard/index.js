// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    last7DaysData: [],
    dataByAge: [],
    dataByGender: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  formate7DaysDataObject = data => ({
    vaccineDate: data.vaccine_date,
    dose1: data.dose_1,
    dose2: data.dose_2,
  })

  formateDataByAgeObject = data => ({
    age: data.age,
    count: data.count,
  })

  formatDataByGenderObject = data => ({
    count: data.count,
    gender: data.gender,
  })

  getVaccinationData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const last7Days = data.last_7_days_vaccination.map(eachObject =>
        this.formate7DaysDataObject(eachObject),
      )

      const dataOnAge = data.vaccination_by_age.map(eachObject =>
        this.formateDataByAgeObject(eachObject),
      )

      const dataOnGender = data.vaccination_by_gender.map(eachObject =>
        this.formatDataByGenderObject(eachObject),
      )

      this.setState({
        last7DaysData: last7Days,
        dataByAge: dataOnAge,
        dataByGender: dataOnGender,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" width={50} height={50} color="#ffffff" />
    </div>
  )

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderSuccess = () => {
    const {last7DaysData, dataByAge, dataByGender} = this.state
    return (
      <div className="main-container">
        <div>
          <VaccinationCoverage lastWeekVaccinationData={last7DaysData} />
          <VaccinationByGender dataByGender={dataByGender} />
          <VaccinationByAge dataByAge={dataByAge} />
        </div>
      </div>
    )
  }

  renderGraphs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="whole-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="website-image"
          />
          <h1 className="logo-heading">Co-WIN</h1>
        </div>
        <h1 className="main-heading">CoWIN Vaccination in India</h1>
        {this.renderGraphs()}
      </div>
    )
  }
}
export default CowinDashboard
