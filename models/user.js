/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */

const { Schema, model } = require("mongoose");
const validator = require("validator");

const userSchema = new Schema(
  {
    name: {
      type: String,
      // required: [true, 'Поле "name" обязательное для заполнения'],
      minlength: [2, 'Поле "name" должно содержать не менее 2 символов'],
      maxlength: [30, 'Поле "name" должно содержать не более 30 символов'],
      default: "Жак-Ив Кусто",
    },
    email: {
      type: String,
      required: [true, 'Поле "email" обязательное для заполнения'],
      validate: {
        validator: (valid) => validator.isEmail(valid),
        message: "Некорректный email. Введите его правильно",
      },
      index: { unique: true },
    },
    password: {
      type: String,
      required: [true, 'Поле "password" обязательное для заполнения'],
      validate: {
        validator: (valid) =>
          validator.isStrongPassword(valid, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          }),
        message:
          "Пароль слишком слабый - вы должны ввести минимум 8 символов - по одному буквенному символу в верхнем и нижнем регистре, одну цифру",
      },
    },
    about: {
      type: String,
      // required: [true, 'Поле "about" обязательное для заполнения'],
      minlength: [2, 'Поле "about" должно содержать не менее 2 символов'],
      maxlength: [30, 'Поле "about" должно содержать не более 30 символов'],
      default: "Исследователь",
    },
    avatar: {
      type: String,
      // required: [true, 'Поле "avatar" обязательное для заполнения'],
      validate: {
        validator: (valid) => validator.isURL(valid),
        message: "Некорректный URL картинки для аватара",
      },
      default:
        "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("user", userSchema);
