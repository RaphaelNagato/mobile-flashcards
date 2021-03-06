export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const REMOVE_DECK = "REMOVE_DECK";
export const ADD_CARD = "ADD_CARD";

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  };
}

export function removeDeck(deckId) {
  return {
    type: REMOVE_DECK,
    deckId,
  };
}

export function addCard(deckId, card) {
  return {
    type: ADD_CARD,
    deckId,
    card,
  };
}
