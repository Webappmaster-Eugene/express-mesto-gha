/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
// eslint-disable-next-line quotes

const Card = require("../models/card");
const { handlerErrors, handlerOk } = require("../utils/errorHandlers");

const getCards = async (req, res) => {
  try {
    const allCards = await Card.find({});

    return handlerOk(allCards, res);
  } catch (err) {
    return handlerErrors(err, res);
  }
};

const createCard = async (req, res) => {
  try {
    const owner = req.user._id;

    const { name, link, likes = [], createdAt = Date.now() } = req.body;
    const newCard = await Card.create({ name, link, owner, likes, createdAt });

    return handlerOk(newCard, res);
  } catch (err) {
    return handlerErrors(err, res);
  }
};

const deleteCard = async (req, res) => {
  try {
    const removedCard = await Card.findByIdAndRemove(req.params.cardId);

    return handlerOk(removedCard, res);
  } catch (err) {
    return handlerErrors(err, res);
  }
};

const likeCard = async (req, res) => {
  try {
    const owner = req.user._id;
    const likedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      {
        $addToSet: { likes: owner },
      },
      { new: true }
    );

    return handlerOk(likedCard, res);
  } catch (err) {
    return handlerErrors(err, res);
  }
};

const dislikeCard = async (req, res) => {
  try {
    const owner = req.user._id;
    const dislikedCard = await Card.findByIdAndRemove(
      req.params.cardId,
      {
        $pull: { likes: owner },
      },
      { new: true }
    );

    return handlerOk(dislikedCard, res);
  } catch (err) {
    return handlerErrors(err, res);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
