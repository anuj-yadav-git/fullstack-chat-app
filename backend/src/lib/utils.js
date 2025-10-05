import jwt from "jsonwebtoken"

//this function generate a jwt, pass it in a cookie and sent to the user
export const generateToken = (userId,res) => {

    //generate jwt token, payload data to encode
    const token = jwt.sign({ userId }, process.env.JWT_SECRET,{
        expiresIn:"7d"
    });

    //Set the token in a cookie
    //cookie is a small piece of data stored on the client side
    res.cookie("jwt",token,{
        maxAge: 7*24*60*60*1000, //millisec
        httpOnly: true, //prevent XSS attack cross-site scripting attack
        sameSite: "strict", //CSRF attack cross-site request forgery attack
        secure: process.env.NODE_ENV !== "development"
    })
    return token
}