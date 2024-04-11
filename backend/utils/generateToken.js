import jwt from "jsonwebtoken"

const generateTokenAndSetToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: '15d'
  })
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 100, // ye ms me hona chahiye
    httpOnly: true, // prevent XSS attacks cross- site scripting attack
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development"
  })
}

export default generateTokenAndSetToken