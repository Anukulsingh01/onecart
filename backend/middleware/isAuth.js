import jwt from 'jsonwebtoken'


// const isAuth = async (req,res,next) => {
//     try {
//         let {token} = req.cookies
        
//         if(!token){
//             return res.status(400).json({message:"user does not have token"})
//         }
//         let verifyToken = jwt.verify(token,process.env.JWT_SECRET)

//         if(!verifyToken){
//             return res.status(400).json({message:"user does not have a valid token"})
//         }
//         req.userId = verifyToken.userId
//         next()

//     } catch (error) {
//          console.log("isAuth error")
//     return res.status(500).json({message:`isAuth error ${error}`})
        
//     }
// }

// export default isAuth
const isAuth = async (req, res, next) => {
    try {
        // Check for token in headers instead of cookies
        let token = req.headers.token || req.cookies.token; 
        
        if (!token) {
            return res.status(400).json({ message: "user does not have token" });
        }
        
        let verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!verifyToken) {
            return res.status(400).json({ message: "user does not have a valid token" });
        }
        
        // Ensure your JWT payload has 'userId' or just 'id'
        req.userId = verifyToken.userId || verifyToken.id; 
        next();

    } catch (error) {
        console.log("isAuth error");
        return res.status(500).json({ message: `isAuth error ${error}` });
    }
}