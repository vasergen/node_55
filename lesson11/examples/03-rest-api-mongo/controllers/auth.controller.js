const { User } = require("../models/user");
const { HttpError, sendEmail } = require("../helpers");
const { Conflict } = require("http-errors");
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");

const bcrypt = require("bcrypt");

const { JWT_SECRET } = process.env;

async function register(req, res, next) {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const verifyToken = v4();
    const savedUser = await User.create({
      email,
      password: hashedPassword,
      verifyToken,
    });

    sendEmail({
      to: email,
      subject: "Confirm email",
      html: `Please confirm your email by clicking on <a href="http://localhost:3001/api/users/verify/${verifyToken}">this link</a>`,
    });

    res.status(201).json({
      data: {
        user: {
          email,
          id: savedUser._id,
        },
      },
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      // throw new HttpError(409, "User with this email already exists");
      throw Conflict("User with this email already exists!");
    }

    throw error;
  }
}

/**
 * 1. Find user by email
 * 2. If user not exists => throw an error 401
 * 3. If user exists => check password
 * 4. If password is the same => then return 200
 */
async function login(req, res, next) {
  const { email, password } = req.body;

  const storedUser = await User.findOne({
    email,
    verified: true,
  });

  if (!storedUser) {
    throw new HttpError(401, "email is not valid or not verified");
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);

  if (!isPasswordValid) {
    throw new HttpError(401, "password is not valid");
  }

  const payload = { id: storedUser._id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

  return res.json({
    data: {
      token,
    },
  });
}

module.exports = {
  register,
  login,
};
