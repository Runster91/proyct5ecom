
// ./src/Router.jsx
 
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import bikesPage from "./pages/bikes"
import BikeState from "./context/Bike/BikeState"
import bikePage from "./pages/bikes/bike"
import Login from "./pages/Login"
import SignUp from "./pages/Sign-up"
import UserState from "./context/User/UserState"
 
function Router() {
  return (
    <>
      <UserState>
        <BikeState>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route
                  index
                  element={
                    <>
                      <p>Este es el home</p>
                    </>
                  }
                />
 
                <Route path="/iniciar-sesion" element={<Login />} />
                <Route path="/registro" element={<SignUp />} />
                <Route
                  path="/perfil"
                  element={
                    <>
                      <p>Está página es mi perfil de usuario</p>
                    </>
                  }
                />
                <Route
                  path="/carrito"
                  element={
                    <>
                      <p>Está página es el carrito de compras</p>
                    </>
                  }
                />
                <Route path="/bikes" element={<bikesPage />} />
                <Route path="/bike/:slug" element={<bikePage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </BikeState>
      </UserState>
    </>
  )
}
 
export default Router
 