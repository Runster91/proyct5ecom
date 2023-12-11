import { useReducer } from "react"
import axiosClient from "../../config/axios"
import UserContext from "./UserContext"
import UserReducer from "./UserReducer"
 
// POR HACER: IMPORTAR AXIOS
const UserState = (props) => {
  // 1. INITIAL STATE
  const initialState = {
    currentUser: {
      name: "",
      lastname: "",
      country: "",
      address: "",
      email: "",
      receipts: [],
      zipCode: 0,
    },
    authStatus: false,
  }
 
  // 2. REDUCERS
  const [globalState, dispatch] = useReducer(UserReducer, initialState)
 
  // 3. DISPATCHERS
 
  // A. REGISTRO DE USUARIO
  const registerUser = async (form) => {
    console.log(form)
    try {
      const res = await axiosClient.post("/api/v1/users/create", form)
 
      const token = res.data.data
 
      dispatch({
        type: "SUCCESSFUL_REGISTER",
        payload: token,
      })
    } catch (error) {
      console.log(error)
    }
  }
 
  
 
  return (
    <UserContext.Provider
      value={{
        currentUser: globalState.currentUser,
        authStatus: globalState.authStatus,
        registerUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
 
export default UserState
 
