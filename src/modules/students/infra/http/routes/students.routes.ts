import { celebrate, Segments, Joi } from 'celebrate'
import { Router } from 'express'

import StudentsController from '../controllers/StudentsController'

const studentsRouter = Router();
const studentsController = new StudentsController()

studentsRouter.get('/', studentsController.index)

studentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      ra: Joi.string().required(),
      cpf: Joi.string().required(),
    }
  }, {
    messages: {
      'string.empty': '{#label} não deve ser vazio!',
      'any.required': '{#label} é um campo obrigatório!',
      'string.email': '{#label} deve ser um e-mail válido'
    }
  }),
  studentsController.create
)

studentsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    }
  }, {
    messages: {
      'string.empty': '{#label} não deve ser vazio!',
      'any.required': '{#label} é um campo obrigatório!',
      'string.email': '{#label} deve ser um e-mail válido'
    }
  }),
  studentsController.update
)

studentsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }, {
    messages: {
      'string.empty': '{#label} não deve ser vazio!',
      'any.required': '{#label} é um campo obrigatório!'
    }
  }),
  studentsController.delete
)

export default studentsRouter
