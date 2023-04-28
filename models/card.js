/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
const { Schema, model, mongoose } = require("mongoose");

const cardSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" обязательное для заполнения'],
    minlength: [2, 'Поле "name" должно содержать не менее 2 символов'],
    maxlength: [30, 'Поле "name" должно содержать не более 2 символов'],
  },
  link: {
    type: String,
    required: [true, 'Поле "link" обязательное для заполнения'],
    default: [],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, 'Поле "owner" обязательное для заполнения'],
  },
  likes: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      default: {},
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("card", cardSchema);
