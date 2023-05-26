import {useState, useEffect} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

const apiStatusSwitch = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const SubPage = props => {
  const [list, setList] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusSwitch.initial)

  const getTechDetails = async () => {
    const {match} = props
    const {params} = match
    const {id} = params

    setApiStatus(apiStatusSwitch.inProgress)
    try {
      const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)

      const fetchedData = await response.json()
      const formattedData = {
        name: fetchedData.course_details.name,
        description: fetchedData.course_details.description,
        imageUrl: fetchedData.course_details.image_url,
        id: fetchedData.course_details.id,
      }
      setList(formattedData)
      setApiStatus(apiStatusSwitch.success)
    } catch (error) {
      console.log('failure')
      setApiStatus(apiStatusSwitch.failure)
    }
  }

  useEffect(() => {
    getTechDetails()
  }, [])

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

  const renderProductDetailsView = () => (
    <div>
      <img src={list.imageUrl} alt={list.name} />
      <div>
        <h1>{list.name}</h1>
        <p>{list.description}</p>
      </div>
    </div>
  )

  const renderProductDetails = () => {
    switch (apiStatus) {
      case apiStatusSwitch.success:
        return renderProductDetailsView()
      case apiStatusSwitch.failure:
        return renderFailureView()
      case apiStatusSwitch.inProgress:
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
      <div>{renderProductDetails()}</div>
    </>
  )
}

export default SubPage
