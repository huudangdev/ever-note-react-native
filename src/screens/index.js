import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from './HomeScreen'
import NewNoteScreen from './NewNoteScreen'
import LoadingScreen from './LoadingScreen'

const AppStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Home'
    })
  },
  NewNote: {
    screen: NewNoteScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'New Note'
    })
  }
})

const RoutesStack = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    App: AppStack
  },
  { initialRouteName: 'Loading' }
)

const Router = createAppContainer(RoutesStack)

export default Router
