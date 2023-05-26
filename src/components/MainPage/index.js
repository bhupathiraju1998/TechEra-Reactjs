import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

const apiStatusSwitch = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

const MainPage = () => {
  const [list, setList] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusSwitch.initial)

  const getTechDetails = async () => {
    setApiStatus(apiStatusSwitch.inprogress)
    try {
      const response = await fetch('https://apis.ccbp.in/te/courses')

      const data = await response.json()
      setApiStatus(apiStatusSwitch.success)
      const formattedData = data.courses.map(eachCourse => ({
        name: eachCourse.name,
        id: eachCourse.id,
        logoUrl: eachCourse.logo_url,
      }))
      setList(formattedData)
    } catch (error) {
      console.log('failure')
      setApiStatus(apiStatusSwitch.failure)
    }
  }
  useEffect(() => {
    getTechDetails()
  }, [])

  const renderCourseDetailsView = () => (
    <div>
      <h1>Courses</h1>
      <ul>
        {list.map(eachCourse => (
          <li key={eachCourse.id}>
            <Link to={`/courses/${eachCourse.id}`}>
              <div>
                <p>{eachCourse.name}</p>
                <div>
                  <img src={eachCourse.logoUrl} alt={eachCourse.name} />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  const renderFailureView = () => (
    <div>
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>

      <button type="button" onClick={() => getTechDetails()}>
        Retry
      </button>
    </div>
  )

  const getCourseDetails = () => {
    switch (apiStatus) {
      case 'SUCCESS':
        return renderCourseDetailsView()
      case 'FAILURE':
        return renderFailureView()
      case 'INPROGRESS':
        return renderLoadingView()

      default:
        return null
    }
  }

  return (
    <>
      <Link to="/">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
            alt="website logo"
          />
        </div>
      </Link>
      <div>{getCourseDetails()}</div>
    </>
  )
}

export default MainPage
