import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import './App.css'

// Header Component
const Header = () => (
  <div className="header">
    <Link to="/login">
      <img
        src="https://res.cloudinary.com/dzt6qmhmq/image/upload/v1690627730/th_zsyw6b.jpg"
        alt="company-logo"
        className="company-logo"
      />
    </Link>
    <div className="header-right">
      <a href="/">Signup</a>
      <a href="/login">Login</a>
      <a href="/movies">Movies</a>
      <a href="/company-info">CompanyInfo</a>
    </div>
  </div>
)

// SingUp Form Component
const SignUp = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    profession: '',
  })

  const handleUserInput = event => {
    const {name, value} = event.target
    setUserData({...userData, [name]: value})
  }

  const SubmitForm = () => {
    localStorage.setItem('userDetails', JSON.stringify(userData))
    alert(`Successfully signed In! Click on Login to proceed..`)
  }

  return (
    <div className="form-container">
      <div>
        <form onSubmit={SubmitForm}>
          <div className="container">
            <h1>Sign Up</h1>
            <hr />

            <label htmlFor="email">
              <b>Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              value={userData.name}
              onChange={handleUserInput}
              required
            />

            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              value={userData.email}
              onChange={handleUserInput}
              required
            />

            <label htmlFor="phone-number">
              <b>Phone Number</b>
            </label>
            <input
              type="text"
              placeholder="Enter Phone Number"
              name="phone-number"
              value={userData.phoneNo}
              onChange={handleUserInput}
              required
            />

            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={userData.password}
              onChange={handleUserInput}
              required
            />

            <label htmlFor="profession">
              <b className="profession">Profession</b>
            </label>
            <select id="profession" onChange={handleUserInput}>
              <option value="">Select Your Profession</option>
              <option value="Architect">Architect</option>
              <option value="Engineer">Engineer</option>
              <option value="Doctor">Doctor</option>
              <option value="Lawyer">Lawyer</option>
            </select>

            <div className="clearfix">
              <button type="submit" className="signupbtn">
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

// Login Form Component
const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    name: '',
    password: '',
    isLoggedIn: false,
  })

  const handleUserInput = event => {
    const {name, value} = event.target
    setLoginData({...loginData, [name]: value})
  }

  const OnSubmitForm = event => {
    event.preventDefault()
    const userData = JSON.parse(localStorage.getItem('userDetails'))

    if (
      userData &&
      userData.name === loginData.name &&
      userData.password === loginData.password
    ) {
      window.location.href = '/movies'
    } else {
      alert('Invalid Credentials')
    }
  }

  return (
    <div className="login-form-container">
      <form onSubmit={OnSubmitForm}>
        <div className="container">
          <label htmlFor="name">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="name"
            value={loginData.name}
            onChange={handleUserInput}
            required
          />

          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={loginData.password}
            onChange={handleUserInput}
            required
          />

          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

// Movies page Component
const Movies = () => {
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch('https://hoblist.com/api/movieList', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            category: 'movies',
            language: 'kannada',
            genre: 'all',
            sort: 'voting',
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to fetch movie data')
        }

        const data = await response.json()
        // Consoled fetched movies data
        console.log(data)
      } catch (error) {
        console.error('Fetching Error:', error)
      }
    }

    fetchMovieData()
  }, [])

  return (
    <div className="movies">
      <h1>Movies List</h1>
      <p>Displayed the fetched movie data in the console..</p>
    </div>
  )
}

// Company Profile Component
const CompanyInfo = () => (
  <div className="company-info-container">
    <h1>Company Info</h1>
    <div className="image-company">
      <img
        src="https://res.cloudinary.com/dzt6qmhmq/image/upload/v1690627730/th_zsyw6b.jpg"
        alt="company"
      />
    </div>
    <p>Company: Geeksynergy Technologies Pvt Ltd</p>
    <p>Address: Sanjayanagar, Bengaluru-56</p>
    <p>Phone: XXXXXXXXX09</p>
    <p>Email: XXXXXX@gmail.com</p>
  </div>
)

// App Component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleUserLogin = status => {
    setIsLoggedIn(status)
  }

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={SignUp} />
        <Route path="/login">
          <LoginForm handleUserLogin={handleUserLogin} />
        </Route>
        <Route
          exact
          path="/movies"
          isLoggedIn={isLoggedIn}
          component={Movies}
        />
        <Route exact path="/company-info" component={CompanyInfo} />
      </Switch>
    </BrowserRouter>
  )
}
export default App
