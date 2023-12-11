

import { useReducer } from "react"
import axios from "axios"

import BikeContext from "./BikeContext"
import BikeReducer from "./BikeReducer"

const BikeState = (props) => {
  // 1. VALOR INICIAL
  const initialState = {
    bikes: [],
    bike: {
      _id: "",
      idStripe: "",
      name: "",
      currency: "",
      prices: [],
      img: [""],
      description: "",
      slug: "",
    },
  }

  // 2. MANEJO DE REDUCERS (CAMBIOS EN EL ESTADO)
  const [globalState, dispatch] = useReducer(BikeReducer, initialState)

  // 3. EVENTOS - DISPATCHERS

  // A. OBTENER TODAS LAS BICIS
  const getBikes = async () => {
    const res = await axios.get("http://localhost:3005/api/v1/bikes/")
    console.log(res)
    const { data } = res
    const { data: dataBikes } = data

    // VALIDACIONES DE ERRORES

    dispatch({
      type: "GET_BIKES",
      payload: dataBikes,
    })
  }

  // B. OBTENER UNA SOLA BICI
  const getBike = async (slug) => {
    const res = await axios.get(
      `http://localhost:3005/api/v1/bikes/readone/${slug}`
    )

    console.log(res)

    const { data } = res
    const { data: dataBike } = data

    dispatch({
      type: "GET_BICI",
      payload: dataBike,
    })
  }

  // 4. RETORNO - ARMADO DE ESTADO

  return (
    <BikeContext.Provider
      value={{
        bikes: globalState.bikes,
        bike: globalState.bike,
        getBikes,
        getBike,
      }}
    >
      {props.children}
    </BikeContext.Provider>
  )
}

export default BikeState
