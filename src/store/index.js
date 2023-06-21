import { configureStore } from "@reduxjs/toolkit"

// @import all reducer from slices
import authReducer from "./slices/auth"
import blogReducer from "./slices/blog"

// @create store
const store = configureStore({
    reducer : {
        blogs : blogReducer,
        auth : authReducer
    },
})

// @export store
export default store