

import { useEffect } from "react"
import { useParams } from "react-router-dom"

import { useContext } from "react"
import BikeContext from "../../../context/Bike/BikeContext"
import priceFormatter from "../../../lib/priceFormatter"

function bikePage() {
  const params = useParams()
  console.log(params)
  const { slug } = params

  const bikeCtx = useContext(BikeContext)
  const { bike, getBike } = bikeCtx
  console.log()

  const { _id, idStripe, name, currency, prices, img, description } = bike

  useEffect(() => {
    getBike(slug)
  }, [])

  return (
    <>
      <div>
        <img src={img[0]} />
        <h1>{name}</h1>
        <p>{description}</p>
        <p>Id MongoDB: {_id}</p>
        <p>Id Stripe: {idStripe}</p>
        <ul>
          {prices.length !== 0 ? (
            <>
              {prices.map((element) => {
                console.log(element)
                const { price, size } = element

                return (
                  <>
                    <li>
                      <h2>Tipo de precio por tamaño: {size}</h2>
                      <p>
                        Precio: {priceFormatter(price)} {currency}{" "}
                      </p>
                    </li>
                  </>
                )
              })}
            </>
          ) : (
            "No hay precios disponibles"
          )}
        </ul>
      </div>
    </>
  )
}

export default bikePage
