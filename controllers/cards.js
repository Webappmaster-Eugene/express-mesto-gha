const { CREATE_CODE } = require('../utils/constants');
const ErrorForbidden = require('../errors/ErrorForbidden');

const Card = require('../models/cards');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create({ name, link, owner: ownerId })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(CREATE_CODE).send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      Card.deleteOne({ _id: card._id, owner: req.user._id })
        .then((result) => {
          if (result.deletedCount === 0) {
            throw new ErrorForbidden(`Карточка с id ${req.params.cardId} не принадлежит пользователю с id ${req.user._id}`);
          } else {
            res.send({ message: 'Пост удалён' });
          }
        })
        .catch(next);
    })
    .catch(next);
};

const cardLikesUpdate = (req, res, updateData, next) => {
  Card.findByIdAndUpdate(req.params.cardId, updateData, { new: true })
    .orFail()
    .then((card) => card.populate(['owner', 'likes']))
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  const ownerId = req.user._id;
  const updateData = { $addToSet: { likes: ownerId } };
  cardLikesUpdate(req, res, updateData, next);
};

module.exports.dislikeCard = (req, res, next) => {
  const ownerId = req.user._id;
  const updateData = { $pull: { likes: ownerId } };
  cardLikesUpdate(req, res, updateData, next);
};
