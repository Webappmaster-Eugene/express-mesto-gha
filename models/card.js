const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле "name" является обязательным для заполнения'],
      minlength: [2, 'Минимальная длина `name` 2 символа'],
      maxlength: [30, 'Максимальная длина поля `name` 30 символов'],
    },
    link: {
      type: String,
      required: [true, 'Поле `link` должно быть заполнено'],
      validate: {
        validator: (v) => isURL(v),
        message: 'Ссылка `link` невалидна',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: [true, 'Поле `owner` является обязательным для заполнения'],
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        default: [],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
