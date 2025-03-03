import rootReducer from "./rootReducer";
import reduxStorage from "./storage";
import { configureStore } from '@reduxjs/toolkit';
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    REGISTER,
    PERSIST,
    PURGE,
    persistReducer,
    persistStore
} from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: reduxStorage,
    blacklist: [],
    whitelist: ['game']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, REGISTER, PAUSE, PURGE, PERSIST]
        },
    }),
});

export const persistor = persistStore(store);