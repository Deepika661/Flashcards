import React from 'react';
import { StyleSheet,Text,View,StatusBar} from 'react-native';
import { Constants } from 'expo';
import { Provider } from 'react-redux';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { TabNavigator, StackNavigator } from 'react-navigation';
import reducer from './reducers/reduce';
import CreateDeck from './components/CreateDeck';
import ShowDeck from './components/ShowDeck';
import DeckData from './components/DeckData';
import CreateCard from './components/CreateCard';
import Quizs from './components/Quizs';
import { createStore } from 'redux';
import { setLocalNotification } from './utils/notifications';
// import { YellowBox } from 'react-native';
// YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);


const NotificationStatusBar=() =>{
      return (
      <View style={{ height: Constants.statusBarHeight }}>
      <StatusBar />
      </View>
      );
}


const TabsMove = TabNavigator({
  ShowDeck: {
    screen: ShowDeck,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='add-circle-outline' size={30} color={tintColor} />
    }
  },
  CreateDeck: {
    screen: CreateDeck,
    navigationOptions: {
      tabBarLabel: 'Create Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }
}, {
  navigationOptions: {
    header: null
  }
});

const NavigatorMove = StackNavigator({
  Main: {
    screen: TabsMove
  },
  DeckData: {
    screen: DeckData
  },
  Quizs: {
    screen: Quizs
  },
  CreateCard: {
    screen: CreateCard
  }
});

export default class App extends React.Component {
  

   componentDidMount() {

    setLocalNotification();
  }



  render() {
    return (
     <Provider store={createStore(reducer)}>
      <View style={styles.contentArea}>
      
          <NotificationStatusBar/>
       <NavigatorMove />
      </View>
       </Provider>
    );
  }
}

const styles = StyleSheet.create({
  contentArea: {
    flex: 1,
       backgroundColor: 'teal',
    padding: 10
  }
});
