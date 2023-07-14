import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { createError } from "../utils/error.js";
//Register
export const registerUserController = async (req, res, next) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(201).json({
      message: "New user has been created successfully",
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};

//Login
export const loginUserController = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(404, "User not found "));
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(createError(404, "Email or password not found "));
    }
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        username: user.username,
        email: user.email,
      },
      process.env.SECRET_KEY
    );

    //ekhane user._doc theke password and isAdmin k bad dia baki data gulo show korbe otherDetails er vitore
    const { password, isAdmin, ...otherDetails } = user._doc;

    // const bearerToken = "Bearer " + token;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails, access_token: token });

    // res.status(200).json({
    //     "message": "Login successfull",
    //     "user": user
    // })
  } catch (err) {
    next(err);
  }
};
