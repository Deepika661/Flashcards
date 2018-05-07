import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import Decks from './Decks';
import { getDecks } from '../actions/action';
import { fetchfromDecks } from '../utils/apis';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';

class ShowDeck extends Component {
 state = {

    deckload: false
  }

  componentDidMount() {

    const { getDecks } = this.props;
      fetchfromDecks()
          .then((decks) => 
            getDecks(JSON.parse(decks)))
          .then(() => this.setState(() =>
           ({ deckLoad: true })));
    }


   render() {
      const { decks, navigation } = this.props;

      const { deckLoad} = this.state;

    if (deckLoad === false) 
    {
      return <AppLoading />;
    }

    return (

      <ScrollView>
      
          {Object.keys(decks).map((deck) => (

            <Decks key={deck} id={deck} navigation={navigation}/>
          ))}

      </ScrollView>

    );
      }
}

function mapStateToProps(decks) {

  return { decks };
}

function mapDispatchToProps(dispatch) {

  return {
    getDecks: (decks) => dispatch(getDecks(decks))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowDeck);


