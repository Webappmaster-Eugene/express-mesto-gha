/* eslint-disable comma-dangle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */

const { Schema, model } = require("mongoose");
const validator = require("validator");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле "name" обязательное для заполнения'],
      minlength: [2, 'Поле "name" должно содержать не менее 2 символов'],
      maxlength: [30, 'Поле "name" должно содержать не более 30 символов'],
    },
    about: {
      type: String,
      required: [true, 'Поле "about" обязательное для заполнения'],
      minlength: [2, 'Поле "about" должно содержать не менее 2 символов'],
      maxlength: [30, 'Поле "about" должно содержать не более 30 символов'],
    },
    avatar: {
      type: String,
      required: [true, 'Поле "avatar" обязательное для заполнения'],
      validate: {
        validator: (v) => validator.isURL(v),
        message: "Некорректный URL картинки для аватара",
      },
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("user", userSchema);
