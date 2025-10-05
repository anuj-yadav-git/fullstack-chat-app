import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    //To grab the value from cookies we use cookie parse in index.js
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorised- No token Provided" });
    }

    //Verify the token, if it is valid then we can access the userId
    //returns payload i.e. user id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorised - Invalid token" });
    }

    //Find the user by userId from the decoded token
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //Here we attach the user to the request object so that it
    //can be accessed in the next middleware or route handler
    req.user = user;
    next();
  } catch (error) {
    console.log(`Error in protectRoute: ${error.message}`);
    res.status(500).json({message: "Internal server error"})
  }
};
