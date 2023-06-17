const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  // console.log(authHeader);
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    if(!token){
      res.status(401);
        throw new Error("Token not found, please login again");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error(err);
      }else{
        req.user = decoded;
        next();
      };
    });
  }else{
    res.status(401);
    throw new Error("Oops something went wrong, Login again")
  };

});

module.exports = validateToken;