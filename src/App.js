
import './App.css';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Userprofile from './components/Userprofile'
import { useSelector ,useDispatch} from 'react-redux'
import { userLogout } from './slices/userSlice';


function App() {

  let activeStyle = {
    fontWeight: "bold",
    color: '#EBE0D0',
    backgroundColor: '#FF0080'
  };

  let { loginStatus } = useSelector(state => state.user)
  let dispatch=useDispatch()


  return (
    <div className='container'>
      {/* links */}
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="https://images-platform.99static.com//pZiz_DAicT7hKU-zDvH_6AQgFFc=/423x1663:1203x2443/fit-in/590x590/99designs-contests-attachments/87/87409/attachment_87409860" width="40px" alt="" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" style={({ isActive }) =>
                  isActive ? activeStyle : undefined
                }

                >
                  <i className="fas fa-home"></i> Home
                </NavLink>
              </li>




              {loginStatus == false ?

                <li className="nav-item">
                  <NavLink className="nav-link" to="login" style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                  }
                  >
                    <i className="fas fa-sign-in-alt"></i> Login
                  </NavLink>
                </li> :


                <li className="nav-item">
                  <NavLink className="nav-link" to="login" onClick={()=>dispatch(userLogout())} style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                  }
                  >
                    <i className="fas fa-sign-in-alt"></i> Logout
                  </NavLink>
                </li>
              }





              <li className="nav-item">
                <NavLink className="nav-link" to="signup" style={({ isActive }) =>
                  isActive ? activeStyle : undefined
                }
                >
                  <i className="fas fa-sign-in-alt"></i> Signup
                </NavLink>
              </li>







              {/* contactus */}

            </ul>

          </div>
        </div>
      </nav>
      {/* define routes */}
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="userprofile" element={<Userprofile />} />
      </Routes>

    </div>
  );
}

export default App;
