import Part from "../models/Part.js"
import stripe from "stripe"
import dotenv from "dotenv"

dotenv.config()

const stripeKey = stripe(process.env.STRIPE_SECRET_KEY)

const readAll = async (req, res) => {
  try {
    const parts = await Part.find()

    return res.json({
      msg: "Bicis leídas con éxito",
      data: parts,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Hubo un error obteniendo los datos.",
    })
  }
}

const readOne = async (req, res) => {
  const { id } = req.params

  try {
    const parts = await Part.findOne({
      slug: id,
    })

    if (!parts) {
      return res.status(400).json({
        msg: "Bici no encontrada",
      })
    }

    res.json({
      msg: "Bici obtenida con éxito.",
      data: parts,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Hubo un error obteniendo los datos.",
    })
  }
}

const create = async (req, res) => {
  const { name, currency, prices, img, description, slug } = req.body

  console.log(req.body)

  // A. GENERACIÓN DE PRODUCTO EN STRIPE
  // 1. CREAR EL PRODUCTO EN STRIPE

  try {
    const product = await stripeKey.products.create({
      name,
      description,
      images: [...img],
      metadata: {
        productDescription: description,
        slug,
      },
    })

    console.log("product", product)

    // 2. CREAR PRECIOS PARA EL PRODUCTO DE STRIPE
    const stripePrices = await Promise.all(
      prices.map(async (priceObj) => {
        return await stripeKey.prices.create({
          currency,
          product: product.id,
          unit_amount: priceObj.price,
          nickname: priceObj.size,
          metadata: {
            size: priceObj.size,
            priceDescription: priceObj.description,
          },
        })
      })
    )

    console.log("stripePrices", stripePrices)

    // 3. CREACIÓN DE PRODUCTO EN BASE DE DATOS
    // A. ADAPTACIÓN DE VARIABLE. EN LUGAR DE PASAR LOS 50 MIL PROPIEDADES. SOLO NECESITO 4 PARA LA BASE DE DATOS CON RESPECTO A PRICING.
    const partsPrices = stripePrices.map((priceObj) => {
      return {
        id: priceObj.id,
        size: priceObj.metadata.size,
        priceDescription: priceObj.metadata.priceDescription,
        price: priceObj.unit_amount,
      }
    })

    // B. CREACIÓN DE BICI DE BASE DE DATOS

    const newpartsDB = await Part.create({
      idStripe: product.id,
      name: product.name,
      prices: partsPrices,
      img,
      currency,
      description: product.description,
      slug,
    })

    return res.status(200).json({
      msg: "Bici creada en Stripe y base de datos. Lo hiciste bebé. ;)",
      data: newpartsDB,
    })
  } catch (error) {
    console.log("error", error)

    return res.status(500).json({
      msg: "Hubo un problema en la creación de la bici",
      error,
    })
  }
}

const edit = async (req, res) => {
  const { id } = req.params

  const { name } = req.body

  try {
    const updatedPart = await Part.findByIdAndUpdate(
      id,
      {
        name,
      },
      { new: true }
    )

    return res.json({
      msg: "bici actualizada con éxito",
      data: updatedPart,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Hubo un error obteniendo los datos.",
    })
  }
}

const deleteOne = async (req, res) => {
  const { id } = req.params

  try {
    const deletedPart = await Part.findByIdAndRemove({
      _id: id,
    })

    if (deletedPart=== null) {
      return res.json({
        msg: "Bici no existe o ya fue borrada con anterioridad",
      })
    }

    return res.json({
      msg: "Bici borrada exitosamente.",
      data: deletedPart,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Hubo un error obteniendo los datos.",
    })
  }
}



export default {
readAll,
create,
}

