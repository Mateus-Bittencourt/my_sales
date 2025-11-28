import { celebrate, Joi, Segments } from "celebrate"

export const createOrderSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    customerId: Joi.number().required(),
    products: Joi.array().items(Joi.object().keys({
      id: Joi.number().required(),
      quantity: Joi.number().min(1).required()
    })).required()
  })
})

export const idParamsValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
})
