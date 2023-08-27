import jwt from 'jsonwebtoken';

export const authRole = (role) =>{
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];//Bearer request
    if(!token) return res.status(401).json({message:'Please log in',token});

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
         if (payload.userType !== role) {
          return res.status(401).json({message:'Unauthorized'});
         }

        next();
      }
}