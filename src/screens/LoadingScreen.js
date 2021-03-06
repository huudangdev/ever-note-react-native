import React, { useEffect } from 'react'
import { AsyncStorage } from 'react-native'
import { AppLoading } from 'expo'

import SampleData from '../sample'

// 1 - LOADING SCREEN
export default function LoadingScreen (props) {
  useEffect(() => checkLocalData(), [])

  function checkLocalData () {
    // Check if LocalStorage has been populated with the sample data
    AsyncStorage.getItem('notes', (err, data) => {
      if (err) return
      // if it doesn't exist, extract from json fil
      if (data === null) {
        AsyncStorage.setItem('notes', JSON.stringify(SampleData.Notes))// save the initial data in Async
        props.navigation.navigate('App') // Navigate to the home page
      } else {
        props.navigation.navigate('App') // Navigate to the home page
      }
    })
  }

  return <AppLoading />
}
