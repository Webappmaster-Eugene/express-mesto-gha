/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
const { Schema, model, mongoose } = require("mongoose");

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    default: [],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
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
