import { NOTES_AVAILABLE, ADD_NOTE, UPDATE_NOTE, DELETE_NOTE } from '../constants'

const dataState = { notes: [] }

const handleAddNote = (action, state) => {
  const { note } = action.data
  const clone = JSON.parse(JSON.stringify(state.notes))
  clone.unshift(note)
  return clone
}

const handleUpdateNote = (action, state) => {
  const { note } = action.data
  const clone = JSON.parse(JSON.stringify(state.notes))
  const index = clone.findIndex((obj) => obj.id === note.id)
  if (index !== -1) clone[index] = note
  return clone
}

const handleDeleteNote = (action, state) => {
  const { id } = action.data
  const clone = JSON.parse(JSON.stringify(state.notes))
  const index = clone.findIndex((obj) => obj.id === id)

  if (index !== -1) clone.splice(index, 1)
}

const dataReducer = (state = dataState, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return { ...state, notes: handleAddNote(action, state) }

    case NOTES_AVAILABLE:
      const { notes } = action.data
      return { ...state, notes }

    case UPDATE_NOTE:
      return { ...state, notes: handleUpdateNote(action, state) }

    case DELETE_NOTE:
      return { ...state, notes: handleDeleteNote(action, state) }
    default:
      return state
  }
}

export default dataReducer
