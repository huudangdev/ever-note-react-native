import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  AsyncStorage
} from 'react-native'

import { useDispatch } from 'react-redux'
import { Header } from 'react-navigation-stack'

import { addNote, updateNote } from '../redux/actions'

const MAX_LENGTH = 250

export default function NewNote (props) {
  const dispatch = useDispatch()
  const { navigation } = props

  const note = navigation.getParam('note', null)

  // 1 - DECLARE VARIABLES
  const [isSaving, setIsSaving] = useState(false)
  const [author, setAuthor] = useState(note ? note.author : '')
  const [text, setText] = useState(note ? note.text : '')

  //= =================================================================================================

  // 2 - GET FLATLIST DATA
  const onSave = () => {
    const edit = note !== null
    let note_ = {}

    if (edit) {
      note_ = note
      note_.author = author
      note_.text = text
    } else {
      const id = generateID()
      note_ = { id: id, author: author, text: text }
    }

    // OPTION 1 - ADD TO LOCAL STORAGE DATA
    AsyncStorage.getItem('notes', (err, notes) => {
      if (err) alert(err.message)
      else if (notes !== null) {
        notes = JSON.parse(notes)

        if (!edit) {
          // add the new Note to the top
          notes.unshift(note_)
        } else {
          // find the index of the Note with the Note id
          const index = notes.findIndex((obj) => obj.id === note_.id)

          // if the Note is in the array, replace the Note
          if (index !== -1) notes[index] = note_
        }

        // Update the local storage
        AsyncStorage.setItem('notes', JSON.stringify(notes), () => {
          if (!edit) dispatch(addNote(note_))
          else dispatch(updateNote(note_))
          navigation.goBack()
        })
      }
    })

    // OPTION 2 - FAKE API
    // let url = "https://my-json-server.typicode.com/mesandigital/demo/Notes";
    // axios.post(url, Note_)
    //     .then(res => res.data)
    //     .then((data) => {
    //         dispatch(Note ? updateNote(data) : addNote(data));
    //         navigation.goBack();
    //     })
    //     .catch(error => alert(error.message))
  }

  //= =================================================================================================

  // 3 - GENERATE ID
  const generateID = () => {
    let d = new Date().getTime()
    const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(5)
    })

    return id
  }

  //= =================================================================================================

  // 4 - RENDER
  const disabled = !((author.length > 0 && text.length > 0))
  return (
    <KeyboardAvoidingView keyboardVerticalOffset={Header.HEIGHT} style={styles.flex} behavior='padding'>
      <SafeAreaView style={styles.flex}>
        <View style={styles.flex}>
          <TextInput
            onChangeText={(text) => setAuthor(text)}
            placeholder='Author'
            autoFocus
            style={[styles.author]}
            value={author}
          />
          <TextInput
            multiline
            onChangeText={(text) => setText(text)}
            placeholder='Enter Note'
            style={[styles.text]}
            maxLength={MAX_LENGTH}
            value={text}
          />
        </View>

        <View style={styles.buttonContainer}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={[styles.count, (MAX_LENGTH - text.length <= 10) && { color: 'red' }]}> {MAX_LENGTH - text.length}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <TouchableHighlight
              style={[styles.button]} disabled={disabled} onPress={onSave}
              underlayColor='rgba(0, 0, 0, 0)'
            >
              <Text style={[styles.buttonText, { color: disabled ? 'rgba(255,255,255,.5)' : '#FFF' }]}>
                                Save
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },

  buttonContainer: {
    height: 70,
    flexDirection: 'row',
    padding: 12,
    backgroundColor: 'white'
  },

  count: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 17,
    color: '#6B9EFA'
  },

  button: {
    width: 80,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6B9EFA'
  },

  buttonText: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 16
  },

  author: {
    fontSize: 20,
    lineHeight: 22,
    fontFamily: 'Helvetica Neue',
    height: 80,
    padding: 16,
    backgroundColor: 'white'
  },

  text: {
    fontSize: 30,
    lineHeight: 33,
    fontFamily: 'Helvetica Neue',
    color: '#333333',
    padding: 16,
    paddingTop: 16,
    minHeight: 170,
    borderTopWidth: 1,
    borderColor: 'rgba(212,211,211, 0.3)'
  }
})
