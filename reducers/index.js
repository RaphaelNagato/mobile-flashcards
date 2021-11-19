import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK } from "../actions";

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
      const { [action.deckId]: undefined, ...restOfState } = state.decks;
      console.log(state);
      console.log(action.deckId);
      console.log(restOfState);

      return {
        decks: { ...restOfState },
      };

    default:
      return state;
  }
}

export default deckReducer;
