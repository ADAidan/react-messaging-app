import { configureStore } from '@reduxjs/toolkit';
import onlineCounterReducer from '../features/onlineCounter/onlineCounterSlice';
import contactsCounterReducer from '../features/contactsCounter/contactsCounterSlice';
import pendingCounterReducer from '../features/pendingCounter/pendingCounterSlice';

export default configureStore({
  reducer: {
    onlineCounter: onlineCounterReducer,
    contactsCounter: contactsCounterReducer,
    pendingCounter: pendingCounterReducer,
  }
});
