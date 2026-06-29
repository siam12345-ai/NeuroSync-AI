const jwt = require("jsonwebtoken");
const {
    errorResponse
} = require("../utils/response");

const verifyToken = (req, res, next) => {

    try {

        // Authorization Header
        const authHeader = req.headers.authorization;

        // Token Check
        if (!authHeader) {

           return errorResponse(
              res,
              401,
             "Access Denied. No Token Provided."
        );

   }

        // Bearer Token
        const token = authHeader.split(" ")[1];

        // Verify Token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Save User Info
        req.user = decoded;

        next();

    }

    catch (error) {

        return errorResponse(
          res,
          401,
          "Invalid or Expired Token"
        );

    }

};

module.exports = verifyToken;