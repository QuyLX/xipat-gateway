import * as Joi from '@hapi/joi';

export const stripeSchema = Joi.object({
  STRIPE_SECRET_KEY: Joi.string().required(),
  STRIPE_CURRENCY: Joi.string().required(),
  FRONT_END_APP: Joi.string().required(),
});
