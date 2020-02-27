import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableHighlight, AsyncStorage, ActivityIndicator } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'

import { addNotes, deleteNote } from '../redux/actions'

import ListItem from '../components/ListItem'

export default function HomeScreen (props) {
  const dispatch = useDispatch()
  const { navigation } = props

  const [isFetching, setIsFetching] = useState(false)

  const dataReducer = useSelector((state) => {
    console.log('state: ' + typeof (state.reducer.notes))
    return state.reducer
  })
  let notes
  if (dataReducer) {
    notes = dataReducer.notes
  }

  useEffect(() => getData(), [])

  const getData = () => {
    setIsFetching(true)
    AsyncStorage.getItem('notes', (err, notes) => {
      if (err) alert(err.message)
      if (notes !== null) dispatch(addNotes(JSON.parse(notes)))
      setIsFetching(false)
    })
  }

  const renderItem = ({ item, index }) => {
    return (
      <ListItem item={item} index={index} navigation={navigation} onDelete={onDelete} onEdit={onEdit} />
    )
  }

  const onEdit = (item) => {
    navigation.navigate('NewNote', { note: item, title: 'Edit Note' })
  }

  const onDelete = (id) => {
    AsyncStorage.getItem('notes', (err, notes) => {
      if (err) alert(err.message)
      else if (notes !== null) {
        console.log(notes)
        notes = JSON.parse(notes)

        // find the index of the Note with the id passed
        const index = notes.findIndex((obj) => obj.id === id)

        // remove the Note
        if (index !== -1) notes.splice(index, 1)

        // Update the local storage
        AsyncStorage.setItem('notes', JSON.stringify(notes), () => dispatch(deleteNote(id)))
      }
    })
  }

  if (isFetching) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator animating />
      </View>
    )
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={notes}
          renderItem={renderItem}
          keyExtractor={(item, index) => `notes_${index}`}
        />

        <TouchableHighlight
          style={styles.floatingButton}
          underlayColor='#ff7043'
          onPress={() => navigation.navigate('NewNote', { title: 'New Note' })}
        >
          <Text style={{ fontSize: 25, color: 'white' }}>+</Text>
        </TouchableHighlight>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },

  activityIndicatorContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },

  floatingButton: {
    backgroundColor: '#6B9EFA',
    borderColor: '#6B9EFA',
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 60,
    right: 15,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  }
})
