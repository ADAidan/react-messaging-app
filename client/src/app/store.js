/* eslint-disable import/no-extraneous-dependencies */
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import logger from 'redux-logger';
import onlineCounterReducer from '../features/onlineCounter/onlineCounterSlice';
import contactsCounterReducer from '../features/contactsCounter/contactsCounterSlice';
import pendingCounterReducer from '../features/pendingCounter/pendingCounterSlice';
import blockedCounterReducer from '../features/blockedCounter/blockedCounterSlice';
import notificationsCounterReducer from '../features/notificationsCounter/notificationsCounterSlice';
import userDataReducer from '../features/userData/userDataSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  onlineCounter: onlineCounterReducer,
  contactsCounter: contactsCounterReducer,
  pendingCounter: pendingCounterReducer,
  blockedCounter: blockedCounterReducer,
  notificationsCounter: notificationsCounterReducer,
  userData: userDataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    })
});

const persistor = persistStore(store);

export { store, persistor };