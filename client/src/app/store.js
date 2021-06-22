import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import loginReducer from "../features/Client/Auth/Login/loginSlice";
import registerReducer from "../features/Client/Auth/Register/registerSlice";
import memberReducer from "../components/Client/Sidebar/memberSlice";
import filterReducer from "../components/Client/Sidebar/components/Filter/filterSlice";
import appReducer from "../appSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    member: memberReducer,
    filter: filterReducer,
    app: appReducer
})

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['member']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

let persistor = persistStore(store);

export { store, persistor }
