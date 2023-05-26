import {Link} from 'react-router-dom'

const NotFound = () => (
  <>
    <Link to="/">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
      />
    </Link>
    <h1>Page Not Found</h1>
    <img
      src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
      alt="not found"
    />
    <p>We are sorry, the page you requested could not be found</p>
  </>
)

export default NotFound
