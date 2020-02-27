import { NOTES_AVAILABLE, ADD_NOTE, UPDATE_NOTE, DELETE_NOTE } from '../constants'

export const addNotes = (notes) => ({
  type: NOTES_AVAILABLE,
  data: { notes }
})

export const addNote = (note) => ({
  type: ADD_NOTE,
  data: { note }
})

export const updateNote = (note) => ({
  type: UPDATE_NOTE,
  data: { note }
})

export const deleteNote = (id) => ({
  type: DELETE_NOTE,
  data: { id }
})
