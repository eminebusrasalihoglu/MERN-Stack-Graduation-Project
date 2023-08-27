import jwt from 'jsonwebtoken';

export const authUser = (req, res, next) =>{
    const token = req.headers['authorization']?.split(' ')[1];//Bearer request

    if(!token) return res.status(401).json({message:'Please log in',token});


    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, payload)=>{
        if(err){
            return res.status(400).json(err);
        }
        req.tokenPayload = payload;
        next();
    })
}