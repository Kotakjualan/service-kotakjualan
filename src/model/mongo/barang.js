const mongoose = require('mongoose')

const schema = mongoose.Schema

const Barang = new schema({
  user_id:{type:String, required:true},
  nama:{type:String, required:true},
  deskripsi:{type:String, required:true},
  harga:{type:Number, required:true},
  stok:{type:Number, required:true},
  gambar:{type:String, required:true},
  isActive:{type:Boolean, required:true}
}, {timestamps:true})

module.exports = mongoose.model("barang", Barang)