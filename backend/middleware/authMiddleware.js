import jwt, { TokenExpiredError } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req,res, next) => {
 console.log('Request Header:', req.headers);

 const authHeader = req.header('Authorization');
 console.log('Authorization Header:', authHeader);

 if(!authHeader) {
    return res.status(401).json({message: "No authorization header, access denied"});

 }

 const parts = authHeader.split('');
 if(parts.length !== 2) {
    return res.status(401).json({message: "Authorization header format must be Bearer [Token]"})
 }

 const token = parts[1];
 console.log('Token:',token);

 if (!token) {
    return res.status(401).json({ message: "No token provided, access denied"});
 }

 try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Decoded:', decoded);
    req.user = decoded;
    next();
 }
 catch (err) {
   console.error('Token verification failed:',err);
   if (err.name === 'JsonwebtokenError') {
     return res.status(401).json({message: 'Invalid token, access denied'});
   } else if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired, access denied'});
   }
   res.status(500).json({ message: 'Server error during authication', error: err});
 }
}

export default authMiddleware;