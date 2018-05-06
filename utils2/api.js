import { AsyncStorage } from 'react-native';

import { DECK_STORAGE_KEY, formatResults } from './deckUtils';

export function fetchDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(formatResults);
}

export function setInitialDecks(decks) {
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks));
}

export function saveCardToDeck(deckTitle, card) {
  // I couldn't find a way to do this by only merging the new data, so instead I pull the full data
  // set, add to it an replace what's there. Idea from armyofda12mnkeys.
  AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((decksString) => {
      const decks = JSON.parse(decksString);
      decks[deckTitle].questions.push(card);
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks));
    });
}

export function saveNewDeck(title) {
  const newDeck = {
    [title]: {
      title: title,
      questions: []
    }
  };

  AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(newDeck));
}
