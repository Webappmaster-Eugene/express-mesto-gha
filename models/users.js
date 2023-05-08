const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isURL = require('validator/lib/isURL');
const bcrypt = require('bcryptjs');

const { ErrorAtAuthorizationEr } = require('../errors/ErrorAutorization');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      validate: {
        validator: (v) => isEmail(v),
        message: 'Вы ввели неправильный формат почты (невалидно)',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля `name` 2 символа'],
      maxlength: [30, 'Максимальная длина поля `name` 30 символов'],
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: [2, 'Минимальная длина поля `about` 2 символа'],
      maxlength: [30, 'Максимальная длина поля `about` 30 символов'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      validate: {
        validator: (v) => isURL(v),
        message: 'Вы ввели неправильный формат ссылки (невалидно)',
      },
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
  },
  {
    versionKey: false,
    statics: {
      async findUserByMailPassword(email, password) {
        const findedUser = await this.findOne({ email }).select('+password');

        if (!findedUser) {
          throw new ErrorAtAuthorizationEr(
            'Вы ввели неправильную почту или пароль!',
          );
        }

        const matchedPassword = await bcrypt.compare(
          password,
          findedUser.password,
        );

        console.log(matchedPassword);

        if (!matchedPassword) {
          throw new ErrorAtAuthorizationEr(
            'Вы ввели неправильную почту или пароль!',
          );
        }

        return findedUser;
      },
    },
  },
);

module.exports = mongoose.model('users', userSchema);
