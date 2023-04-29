/* eslint-disable quotes */
/* eslint-disable import/no-extraneous-dependencies */

const routerCard = require("express").Router();
const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

routerCard.get("/", getCards);
routerCard.delete("/:cardId", deleteCard);
routerCard.post("/", createCard);
routerCard.put("/:cardId/likes", likeCard);
routerCard.delete("/:cardId/likes", dislikeCard);

module.exports = { routerCard };
