import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

//maki API call to perform user login
export let userLogin = createAsyncThunk('loginuser', async (userCredObj, thunkApi) => {

    //http post req
    let response = await axios.post("http://localhost:5000/user/login", userCredObj)
    let data = response.data

    if (data.message == 'invalid-username') {
        return thunkApi.rejectWithValue("Invalid username")
    }
    if (data.message == 'invalid-password') {
        return thunkApi.rejectWithValue("Invalid password")
    }

    if (data.message == 'success') {

        let token = data.payload;

        //save in local storage
        localStorage.setItem("token", token)
        return data.userObj
    }


})


export const userSlice = createSlice({
    name: 'user',
    initialState: { userObj: null, loginStatus: false, isError: false, errMsg: '', isPending: false },
    reducers: {
        userLogout: (state) => {
            state.loginStatus = false;
            localStorage.clear()
        }
    },
    extraReducers: {
        [userLogin.pending]: (state, action) => {
            state.isPending = true;
        },
        [userLogin.fulfilled]: (state, action) => {

            state.loginStatus = true;
            state.isPending = false;
            state.isError = false;
            state.errMsg = '';
            state.userObj = action.payload;
        },
        [userLogin.rejected]: (state, action) => {

            state.errMsg = action.payload
            state.isError = true;
            state.isPending = false;
            state.userObj = null;
            state.loginStatus = false;

        },
    }
})


//export action creator functions
export const { userLogout } = userSlice.actions
//export reducer of userSlice
export default userSlice.reducer