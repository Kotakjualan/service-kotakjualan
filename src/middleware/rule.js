const Joi = require('joi')
const { validator } = require('../helper/response')


const middleRegister = (req, res, next) => {
  const schema = Joi.object().keys({
    nama : Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    password : Joi.string().required()
  })
  const {error, value} = schema.validate(req?.body)
  validator(req, res, next, error, value)
}

const middleLogin = (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password : Joi.string().required()
  })
  const {error, value} = schema.validate(req?.body)
  validator(req, res, next, error, value)
}

const middleGetBarangDetail = (req, res, next) => {
  const schema = Joi.object().keys({
    id:Joi.string().optional()
  })
  const {error, value} = schema.validate(req?.body)
  validator(req, res, next, error, value)
}

const middleGetBarangWithStatus = (req, res, next) => {
  const schema = Joi.object().keys({
    isActive:Joi.boolean().optional()
  })
  const {error, value} = schema.validate(req?.body)
  validator(req, res, next, error, value)
}

const middleTambahBarang = (req, res, next) => {
  const schema = Joi.object().keys({
    id: Joi.string().required(),
    nama: Joi.string().required(),
    deskripsi : Joi.string().required(),
    harga:Joi.number().required(),
    stok:Joi.number().required(),
    gambar:Joi.any().optional(),    
  })
  const {error, value} = schema.validate(req?.body)
  validator(req, res, next, error, value)
}

const middleEditBarang = (req, res, next) => {
  const schema = Joi.object().keys({
    id: Joi.string().required(),
    update : Joi.object().required().keys({
      nama: Joi.string().optional(),
      deskripsi : Joi.string().optional(),
      harga:Joi.number().optional(),
      stok:Joi.number().optional(),
      gambar:Joi.any().optional(),
      isActive:Joi.boolean().optional()
    })    
  })
  const {error, value} = schema.validate(req?.body)
  validator(req, res, next, error, value)
}

const middleDeleteBarang = (req, res, next) => {
  const schema = Joi.object().keys({
    id: Joi.string().required(),   
  })
  const {error, value} = schema.validate(req?.body)
  validator(req, res, next, error, value)
}



module.exports = {
  middleRegister,
  middleLogin,
  middleTambahBarang,
  middleEditBarang,
  middleDeleteBarang,
  middleGetBarangWithStatus,
  middleGetBarangDetail
}
