const barang = require("../model/mongo/barang")
const user = require("../model/mongo/user")

const registerUser = async (nama, phone, email, password) => {
  
  nama = (nama||"")
  phone = (phone||"")
  email = (email||"")
  password = (password||"")

  const resUser = await user.findOne({email})

  if(resUser?.email === email){
    return {status:false, data:`Data dengan email ${email} telah terdaftar`}
  }

  const createUser = new user({
    nama,
    phone,
    email,
    password
  })

  const res = await createUser.save()

  if(res?.email === email){
    return{status:true, data:`Berhasil membuat akun baru dengan email ${email}`}
  }

  return {status:false, data:"Terjadi kesalahan ketika membuat akun"}

}

const loginUser = async (email, password) => {

  email = (email||"")
  password = (password||"")

  const resUser = await user.findOne({email, password})

  if(resUser?.email === email && resUser?.password === password){
    return {status:true, data:`User dengan email ${email} berhasil masuk`}
  }
  else if(resUser?.email !== email && resUser?.password !== password){
    return {status:false, data:`User dengan email ${email} tidak ditemukan`}
  }

  return {status :false, data:`Terjadi kesalahan ketika proses login`}

}

const getBarangAll = async () => {

  try {
    
    const resBarang = await barang.find({})

    return {status:true, data:resBarang}

  } catch (error) {
    
    return {status:false, data:"Terjadi Kesalahan"}

  }

}

const getBarangDetail = async (id) => {

  id = (id||"")

  if(String(id)?.length === 0){
    return {status:false, data:"Reuest tidak memiliki ID"}
  }

  try {
    
    const resBarang = await barang.findById(id)

    return {status:true, data:resBarang}

  } catch (error) {
    
    return {status:false, data:"Terjadi kesalahan"}

  }

}

const getBarangByStatus = async (status) => {

  status = (status||null)

  try {
    
    if(status === null || status === undefined){
      const resBarangAll = await barang.find({})
      return {status:true, data:resBarangAll}
    }
  
  
    const resBarangWithStatus = await barang.find({isActive:status})
  
    return {status:true, data:resBarangWithStatus}

  } catch (error) {
   
    return {status:false, data:"Terjadi kesalahan"}

  }

}

const createBarang = async (id, nama, deskripsi, harga, stok, gambar) => {

  id = (id||"")
  nama = (nama||"")
  deskripsi = (deskripsi||"")
  harga = (harga||0)
  stok = (stok||0)
  gambar = (gambar||"")

  const resUser = await user.findById(id)

  if(resUser?._id !== id){
    return {status:false, data:"User tidak ditemukan"}
  }

  const createBarang = new barang({
    user_id:id, nama, deskripsi, harga, stok, gambar
  })

  const resCreateBarang = await createBarang.save()

  if(resCreateBarang?.nama === nama){
    return {status:true, data:`Barang dengan nama ${nama} berhasil di masukan`}
  }

  return {status:false, data:`Terjadi kesalahan`}

}

const editBarang = async (id, updateData) => {

  id = (id||"")
  updateData = (updateData||{})

  const resBarang = await barang.findById(id)

  if(resBarang?._id !== id){
    return {status:false, data:`ID barang ${id} tidak ditemukan`}
  }

  const resUpdateBarang = await barang.findByIdAndUpdate(id, updateData)

  console.log(resUpdateBarang)

  if(resUpdateBarang?._id === id){
    return {status:true, data:`Barang dengan ID ${id} berhasil di update`}
  }

  return {status:false, data:"Terjadi kesalahan"}

}

const deleteBarang = async (id) => {

  id = (id||"")

  if(String(id)?.length === 0){
    return {status:false, data:`Parameter ID tidak tersedia`}
  }

  const resBarang = await barang.findById(id)

  if(resBarang?._id === id){
    return {status:false, data:`Data barang dengan ${id} tidak tersedia`}
  }

  const resDeleteBarang = await barang.findByIdAndDelete(id)

  if(resDeleteBarang?._id === id){
    return {status:true, data:`Data dengan ID ${id} berhasil dihapus`}
  }
  getBarangByStatus
  return {status:false, data:`Terjadi kesalahan`}

}




module.exports = {
  registerUser,
  loginUser,
  createBarang,
  editBarang,
  deleteBarang,
  getBarangByStatus,
  getBarangAll,
  getBarangDetail
}