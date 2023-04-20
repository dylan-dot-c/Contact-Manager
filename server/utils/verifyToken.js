import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();


function verifyToken(req, res , next){
    
    const authHeader = req.headers.authorization;    
    const token  = authHeader && authHeader.split(" ")[1]

    if(!token){
        res.status(401).json({ message  : "Unauthorized , because token is missing"});
    }
    
    try {    
        const decoded = jwt.verify(token,process.env.ENCRYPTION_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message :'Unauthorized'})
    
    }
}

export default verifyToken;