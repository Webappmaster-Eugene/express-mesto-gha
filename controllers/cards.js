/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
// eslint-disable-next-line quotes

const Card = require("../models/card");

const getCards = async (req, res) => {
  try {
    const allCards = await Card.find({});

    if (allCards.length !== 0) {
      return res.send(allCards);
    }

    return res.send({ message: "Массив карточек пуст" });
  } catch (err) {
    return res
      .status(404)
      .send("Произошла ошибка запроса, проверьте правильность ввода");
  }
};

const createCard = async (req, res) => {
  try {
    const owner = req.user._id;

    const { name, link, likes = [], createdAt = Date.now() } = req.body;
    const newCard = await Card.create({ name, link, owner, likes, createdAt });

    if (newCard) {
      return res.send(newCard);
    }

    return res.send({ message: "Карточка не создана" });
  } catch (err) {
    return res
      .status(404)
      .send("Произошла ошибка запроса, проверьте правильность ввода");
  }
};

const deleteCard = async (req, res) => {
  try {
    const removedCard = await Card.findByIdAndRemove(req.params.cardId);

    if (removedCard) {
      return res.send(removedCard);
    }

    return res.send({ message: "Карточка не удалена" });
  } catch (err) {
    return res
      .status(404)
      .send("Произошла ошибка запроса, проверьте правильность ввода");
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

    if (likedCard) {
      return res.send(likedCard);
    }

    return res.send({ message: "Карточка не лайкнута" });
  } catch (err) {
    return res
      .status(404)
      .send("Произошла ошибка запроса, проверьте правильность ввода");
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

    if (dislikedCard) {
      return res.send(dislikedCard);
    }

    return res.send({ message: "Не получилось удалить ваш лайк из карточки" });
  } catch (err) {
    return res
      .status(404)
      .send("Произошла ошибка запроса, проверьте правильность ввода");
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
