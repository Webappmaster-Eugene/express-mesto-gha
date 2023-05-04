/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
// eslint-disable-next-line quotes

const Card = require('../models/card');
const { handlerErrors, handlerOk } = require('../utils/errorHandlers');
const { CREATE_SUCCESS_CODE } = require('../utils/goodResponseCodes');

const getCards = async (req, res) => {
  try {
    const allCards = await Card.find({});

    return handlerOk(allCards, res);
  } catch (err) {
    return handlerErrors(res, err);
  }
};

const createCard = async (req, res) => {
  try {
    const owner = req.user._id;

    const { name, link, likes = [], createdAt = Date.now() } = req.body;
    const newCard = await Card.create({ name, link, owner, likes, createdAt });

    return res.status(CREATE_SUCCESS_CODE).send({ data: newCard });
  } catch (err) {
    return handlerErrors(res, err);
  }
};

const deleteCard = async (req, res) => {
  try {
    const id = req.params.cardId;
    const removedCard = await Card.findByIdAndRemove(id);

    return handlerOk(removedCard, res);
  } catch (err) {
    return handlerErrors(res, err);
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
      { new: true },
    );

    return handlerOk(likedCard, res);
  } catch (err) {
    return handlerErrors(res, err);
  }
};

const dislikeCard = async (req, res) => {
  try {
    const owner = req.user._id;
    const dislikedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      {
        $pull: { likes: owner },
      },
      { new: true },
    );

    return handlerOk(dislikedCard, res);
  } catch (err) {
    return handlerErrors(res, err);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
