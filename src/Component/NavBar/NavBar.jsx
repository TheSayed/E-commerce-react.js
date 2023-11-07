import logo from "E:/React/Lecture 3/amazon/src/Assets/Images/Logo.PNG";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/userContext';
import { useContext } from "react";



export default function NavBar() {
  const { userToken, setUserToken } = useContext(UserContext)
  const naviagte = useNavigate()
  function logout() {
    localStorage.removeItem('userToken')
    setUserToken(null)
    naviagte('./login')
  }
  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="FreshMarket-Logo" width={40} />
          FreshCart</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          {userToken !== null ?
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/cart">Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/product">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/categories">Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/brands">Brands</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/wishlist">WishList</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/allorders">orders</Link>
              </li>


              <li className="nav-item ms-auto mb-2 mb-lg-0">
                <span className="nav-link active cursor-pointer" onClick={() => { logout() }} aria-current="page" >Logout</span>
              </li>

            </ul> : <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/regisiter">regisiter</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/login">login</Link>
              </li>

            </ul>
          }



        </div>
      </div>
    </nav>

  </>
}

