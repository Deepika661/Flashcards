import { GET_DECKS, ADD_NEW_CARD, ADD_NEW_DECK } from '../actions/action';


function deck(state= {},action){

	
  const { card ,type, deck, decks} = action;


switch (type){
		case GET_DECKS:
			return{
				...state,
				...decks
		};

	case ADD_NEW_CARD:
	return{
		...state,
			[deck]:
			{
				...state[deck],
				questions: [
				...state[deck].questions,
	         card
			]
		}
	};

		case ADD_NEW_DECK:
			return {
					...state,
					[deck]:{
					title: deck,
					questions:[]
			}
		};

		default:
		return state;

	}
}


export default deck;