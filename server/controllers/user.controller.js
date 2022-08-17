const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = require("../config/jwt.config");

module.exports = {
  findAllUsers: (req, res) => {
    User.find({})
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },
  findThisUser: (req, res) => {
    const data = req.cookies.usertoken;
    const decodedData = jwt.decode(data);
    User.findOne({ _id: decodedData.id })
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },
  register: (req, res) => {
    User.create(req.body)
      .then((user) => {
        const userToken = jwt.sign(
          {
            id: user._id,
          },
          process.env.SECRET_KEY
        );

        res
          .cookie("usertoken", userToken, secret, {
            httpOnly: true
          })
          .json({ msg: "success!", user: user });
      })
      .catch((err) => res.status(400).json(err));
  },
  login: async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user === null || !req.body.password) {
      return res.sendStatus(400);
    }

    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!correctPassword) {
      return res.sendStatus(400);
    }

    const userToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_KEY
    );

    res
      .cookie("usertoken", userToken, secret, {
        httpOnly: true,
      })
      .json({ msg: "success!", user: user });
  },
  logout: (req, res) => {
    res.clearCookie("usertoken");
    res.sendStatus(200);
  },
  updateUser: (req, res) => {
    User.findOneAndUpdate(
      { _id: req.body.id },
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .then((updatedUser) => res.json(updatedUser))
      .catch((err) => res.status(400).json(err));
  },
  uploadImage: (req, res) => {
    User.findOneAndUpdate({ _id: req.body.creator }, {
      pic: req.file.filename
    }, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => res.status(400).json(err));
  },
  getRecipes: (req, res) => {
    const data = req.cookies.usertoken;
    const decodedData = jwt.decode(data);
    if (decodedData) {
      User.findOne({ _id: decodedData.id }).populate('recipes.recipe')
        .then((user) => {
          res.json(user.recipes)
        })
        .catch((err) => res.json(err));
    }
  },
  removeRecipeFromBook: (req, res) => {
    const data = req.cookies.usertoken;
    const decodedData = jwt.decode(data);
    User.findOneAndUpdate(
      { _id: decodedData.id },
      { $pull: { recipes: { recipe: req.params.id } } },
      { new: true, safe: true, multi: false })
    .then((user) => {
      res.json(user)
    })
    .catch((err) => res.json(err));
  }
};
