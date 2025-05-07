import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { cartReducer } from './reducers/cartReducer'

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    cart: persistReducer(persistConfig, cartReducer),
})

export const store = createStore(rootReducer)
export const persistor = persistStore(store)
