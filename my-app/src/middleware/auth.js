import jwt from 'jsonwebtoken';
import config from 'config';

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    const secret = config.get('jwtSecret');

    if (!taken) {
        return res
        .status (401)
        .json({message: 'missing authentication taken. Authorization failed'});
    }

    try{
    const decodedToken = jwt.verify(token, secret);
    req.user = decodedToken.user;
    
    next()
    } catch (error) {
        res
        .status(401)
        .json({message: 'Invalid authentication token. Authorization failed'});

    }
};

export default auth;