const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');

const { LINK_REGEXP } = require('../utils/constants');
const ErrorAuthorization = require('../errors/ErrorAutorization');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля "name" 2 символа'],
    maxlength: [30, 'Максимальная длина поля "name" 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Минимальная длина поля "about" 2 символа'],
    maxlength: [30, 'Максимальная длина поля "about" 30 символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => LINK_REGEXP.test(v),
      message: 'Неправильный формат ссылки',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  versionKey: false,
  statics: {
    findUserByCredentials(email, password) {
      return this.findOne({ email }).select('+password')
        .then((user) => {
          if (!user) {
            throw new ErrorAuthorization('Неправильная почта или пароль');
          }
          return bcrypt.compare(password, user.password)
            .then((matched) => {
              if (!matched) {
                throw new ErrorAuthorization('Неправильная почта или пароль');
              }
              return user;
            });
        });
    },
  },
});

module.exports = mongoose.model('users', userSchema);
