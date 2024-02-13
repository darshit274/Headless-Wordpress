import { configureStore } from "@reduxjs/toolkit";
import authReducer  from "./slice/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const myPersistConfig = {
    key: 'dsq',
    storage
}
const pesisitAuthReducer = persistReducer(myPersistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: pesisitAuthReducer,
    }
});

export const persistedStore = persistStore(store);