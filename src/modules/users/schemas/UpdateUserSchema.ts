import { celebrate, Joi, Segments } from 'celebrate'

export const updateUserSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
    old_password: Joi.string().when('password', {
      is: Joi.exist(),
      then: Joi.required(),
    }),
    password: Joi.string(),
    password_confirmation: Joi.string()
      .valid(Joi.ref('password'))
      .when('password', {
        is: Joi.exist(),
        then: Joi.required(),
      })
      .messages({
        'any.only': 'Password confirmation does not match password',
      }),
  }),
})
