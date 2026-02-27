// import { v2 as cloudinary } from 'cloudinary';
// import fs from 'fs'


// const uploadOnCloudinary = async (filePath) => {
//     cloudinary.config({ 
//         cloud_name: process.env.CLOUDINARY_NAME, 
//         api_key: process.env.CLOUDINARY_API_KEY , 
//         api_secret: process.env.CLOUDINARY_API_SECRET 
//     });
//     try {
//         if(!filePath){
//         return null
//     }
//     const uploadResult = await cloudinary.uploader.upload
//     (filePath)
//     fs.unlinkSync(filePath)
//     return uploadResult.secure_url

    
        
//     } catch (error) {
//         fs.unlinkSync(filePath)
//         console.log(error)
//     }
    
// }
// export default uploadOnCloudinary
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
console.log("NAME:", process.env.CLOUDINARY_NAME)
console.log("KEY:", process.env.CLOUDINARY_API_KEY)
console.log("SECRET:", process.env.CLOUDINARY_API_SECRET)
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY , 
  api_secret: process.env.CLOUDINARY_API_SECRET 
})

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null

    const uploadResult = await cloudinary.uploader.upload(filePath)

    fs.unlinkSync(filePath)

    return uploadResult.secure_url

  } catch (error) {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
    console.log("Cloudinary Upload Error:", error)
    return null
  }
}

export default uploadOnCloudinary