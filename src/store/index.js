import { configureStore } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";

import checkTokenExpirationMiddleware from "../middlewares/checkTokenExpiration";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["select", "equipmentInfo", "auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(checkTokenExpirationMiddleware),
});

const persistor = persistStore(store);

export { store, persistor };
