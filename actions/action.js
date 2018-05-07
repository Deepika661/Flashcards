export const GET_DECKS = 'GET_DECKS';
export const ADD_NEW_DECK = 'ADD_NEW_DECK';
export const ADD_NEW_CARD = 'ADD_NEW_CARD';


export function addNewDeck(deck) {
    return {
        type: ADD_NEW_DECK,
        deck
      };
}


export function getDecks(decks) {
	  return {
    	    type: GET_DECKS,
    	    decks
    	  };
  }

export function addNewCard(deck, card) {
    return {
        type: ADD_NEW_CARD,
        deck, card
      };
}

