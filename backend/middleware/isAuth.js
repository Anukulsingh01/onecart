import jwt from 'jsonwebtoken'

const isAuth = async (req, res, next) => {
    try {
        // Headers mein 'token' check karega
        const token = req.headers.token || req.cookies.token; 
        
        if (!token) {
            return res.status(400).json({ message: "No token found, please login" });
        }
        
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!verifyToken) {
            return res.status(400).json({ message: "Invalid token" });
        }
        
        // Payload check: userId ya id dono handle kar lega
        req.userId = verifyToken.userId || verifyToken.id; 
        next();

    } catch (error) {
        console.log("isAuth error:", error.message);
        return res.status(401).json({ message: "Session expired, please login again" });
    }
}

export default isAuth;