import {AsyncStorage } from 'react-native';

import { DECKS_KEY, setdata } from './deckData';

  export function setFirstDecks(deck) {
      AsyncStorage.setItem(DECKS_KEY, JSON.stringify(deck));
    }

    export function fetchfromDecks() {
      return AsyncStorage.getItem(DECKS_KEY)
        .then(setdata);
    }

    export function saveToDeck(deckTitle, card) {
    
      AsyncStorage.getItem(DECKS_KEY)
      .then((decksText) => {
          const deck = JSON.parse(decksText);
          deck[deckTitle].questions.push(card);
          AsyncStorage.setItem(DECKS_KEY, JSON.stringify(deck));
        });
    }

    export function saveNewDeck(title) {
      const createNewDeck = {
            [title]: {
              title: title,
              questions: []
        }
      };

    AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify(createNewDeck));
  }
