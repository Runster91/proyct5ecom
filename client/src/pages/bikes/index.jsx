

import { useContext, useEffect } from "react"
import BikeContext from "../../context/Bike/BikeContext"
import { Link } from "react-router-dom"

function BikesPage() {
  // TRAERME LOS DATOS DE LAS PIZZAS DEL SERVER
  const bikeCtx = useContext(BikeContext)

  const { bikes, getBikes } = bikeCtx

  useEffect(() => {
    getBikes()
  }, [])

  console.log(bikeCtx)

  return (
    <>
      <div>
        <ul>
          {bikes.length !== 0
            ? bikes.map((bike, i) => {
                const { name, slug } = bike

                return (
                  <Link key={i} to={`/bikes${slug}`}>
                    <li>{name}</li>
                  </Link>
                )
              })
            : "No hay bicis disponibles"}
        </ul>
      </div>
    </>
  )
}

export default BikesPage
