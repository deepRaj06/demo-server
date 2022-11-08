
const jwt = require('jsonwebtoken');
require('dotenv').config()

const authentication = (req, res, next) => {

    if(!req.headers.authorization){
        res.json("Authorization failed")
    }

    const token = req.headers.authorization.split("")[1]

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {

        if(err){
            res.json("Invalid Login details")
        }
        

        if(decoded){
            req.body.userId = decoded.userId
            res.json("Authorized!")
        }
        
      });
}

module.exports = {
    authentication
}
