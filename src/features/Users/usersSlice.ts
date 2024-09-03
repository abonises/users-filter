import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { RootState } from '../../app/store';
import {User} from "../../../models/models.ts";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

type UsersState = {
    users: User[],
    status: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: UsersState = {
    users: [],
    status: 'idle',
    error: null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await axios.get(USERS_URL);
        return [...response.data] as User[];

    } catch (err) {
        return err.message;
    }
})
type UsersReducers = {

}

const usersSlice = createSlice<UsersState, UsersReducers>({
    name: "users",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state: RootState) => {
                state.status = 'loading'
            })
            .addCase(fetchUsers.fulfilled, (state: RootState, action) => {
                state.status = 'succeeded'
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state: RootState, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})


export const selectAllUsers = (state: RootState) => state.users.users;

export const getUsersStatus = (state: RootState) => state.users.status;

export const usersError = (state: RootState) => state.users.error;

export default usersSlice.reducer;