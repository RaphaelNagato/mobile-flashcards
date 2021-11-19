import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK, ADD_CARD } from "../actions";

function deckReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return { ...state, ...action.decks };
    case ADD_DECK:
      return {
        ...state,
        ...action.deck,
      };
    case REMOVE_DECK:
      const { [action.deckId]: undefined, ...restOfState } = state;

      return {
        ...restOfState,
      };
    case ADD_CARD:
      const { deckId, card } = action;
      return {
        ...state,
        [deckId]: {
          title: deckId,
          questions: state[deckId].questions.concat(card),
        },
      };
    default:
      return state;
  }
}

export default deckReducer;
