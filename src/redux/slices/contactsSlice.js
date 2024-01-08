import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.data.push(...action.payload);
      } else {
        state.data.push(action.payload);
      }
    },
    deleteContact(state, action) {
      state.data = state.data.filter(el => el.id !== action.payload);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const selectContacts = state => state.contacts.data; // Selector for the contacts array
export const contactsReducer = contactsSlice.reducer;
