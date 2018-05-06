import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';

import { fetchfromDecks } from '../utils/apis';
import { getDecks } from '../actions/action';
import {Decks} from './Decks';

class ShowDeck extends Component {
 state = {
    deckload: false
  }

  componentDidMount() {
    const { getDecks } = this.props.getDecks;
    fetchfromDecks()
      .then((decks) => getDecks(JSON.parse(decks)) || {})
      .then(() => this.setState(() => ({ deckLoad: true })));
  }


   render() {
    const { decks, navigation } = this.props;
    const { deckLoad} = this.state;

    if (deckLoad === false) {
      return <AppLoading />;
    }

    return (
      <ScrollView>
        //{Object.keys(decks).map((deck) => (
          //<Decks key={deck} id={deck} navigation={navigation}/>
        //))}
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


