/* eslint-disable quotes */
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" обязательное для заполнения'],
    minlength: [2, 'Поле "name" должно содержать не менее 2 символов'],
    maxlength: [30, 'Поле "name" должно содержать не более 2 символов'],
  },
  about: {
    type: String,
    required: [true, 'Поле "about" обязательное для заполнения'],
    minlength: [2, 'Поле "about" должно содержать не менее 2 символов'],
    maxlength: [30, 'Поле "about" должно содержать не более 2 символов'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле "avatar" обязательное для заполнения'],
  },
});

module.exports = mongoose.model("user", userSchema);
