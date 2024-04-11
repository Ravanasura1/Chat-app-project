import User from "../models/user.models.js";

export const getUserForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUser = await User.find({ _id: { $ne: loggedInUserId } })
    .select("-password")

    return res.status(200).json({ filteredUser })

  } catch (error) {
    console.log("Error in getUserForSodeBar: ", error.message);
    res.status(500).json({ error: "Internal server error" })
  }
}