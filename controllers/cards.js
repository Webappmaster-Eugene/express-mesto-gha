const { OK_CODE, CREATE_CODE } = require('../utils/responseCodes');
const { ErrorForbidden } = require('../errors/ErrorForbidden');

const Card = require('../models/cards');

const getCards = async (req, res, next) => {
  try {
    const allCards = await Card.find({}).orFail();

    return res.status(OK_CODE).send(allCards);
  } catch (err) {
    return next(err);
  }
};

const createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  try {
    const createdCard = await Card.create({
      name,
      link,
      owner: ownerId,
    });
    return res.status(CREATE_CODE).send(createdCard);
  } catch (err) {
    return next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const findedCard = await Card.findById(req.params.cardId).orFail();
    const deletedCard = await Card.deleteOne({
      _id: findedCard._id,
      owner: req.user._id,
    });

    if (!deletedCard) {
      throw new ErrorForbidden(
        `Ошибка доступа! Карточка с данным id ${req.params.cardId} не принадлежит пользователю с _id ${req.user._id}`,
      );
    } else {
      res
        .status(OK_CODE)
        .send({ message: 'Карточка удалена успешно и без ошибок' });
    }
  } catch (err) {
    return next(err);
  }
};

const likeCard = async (req, res, next) => {
  const ownerId = req.user._id;
  try {
    const likedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      {
        $addToSet: { likes: ownerId },
      },
      { new: true },
    ).orFail();

    return res.status(OK_CODE).send(likedCard);
  } catch (err) {
    return next(err);
  }
};

const dislikeCard = async (req, res, next) => {
  const ownerId = req.user._id;
  try {
    const dislikedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      {
        $pull: { likes: ownerId },
      },
      { new: true },
    ).orFail();

    return res.status(OK_CODE).send(dislikedCard);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
