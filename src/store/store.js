import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./reducers/rootReducer"; // Assuming rootReducer uses the setup you provided
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage"; // Local storage as the storage engine
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"; // Optional state reconciler

const persistConfig = {
  key: "root", // The key for the root reducer in storage
  storage, // The storage engine (local storage in this case)
  stateReconciler: autoMergeLevel2, // Optional: merge strategies for rehydration
};

// Wrap your rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer());

// Store creation
// Store creation with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // Add any other actions you want to ignore here
      },
    }).concat(thunk), // Add middleware like thunk
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
});

// Set up persistor for rehydration
export const persistor = persistStore(store);

export default store;
