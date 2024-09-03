import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from 'axios';
import { RootState } from '../../app/store';
import {User} from "../../../models/models.ts";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

type UsersState = {
    users: User[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: UsersState = {
    users: [],
    status: 'idle',
    error: null
}

export const fetchUsers = createAsyncThunk<User[], void>('users/fetchUsers', async () => {
    try {
        const response = await axios.get(USERS_URL);
        return response.data as User[];
    } catch (err) {
        if (axios.isAxiosError(err)) {
            throw new Error(err.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
});



// @ts-ignore
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state: UsersState) => {
                state.status = 'loading'
            })
            .addCase(fetchUsers.fulfilled, (state: UsersState, action: PayloadAction<User[]>) => {
                state.status = 'succeeded'
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state: UsersState, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'Unknown error occurred';
            })
    }
})


export const selectAllUsers = (state: RootState) => state.users.users;

export const getUsersStatus = (state: RootState) => state.users.status;

export const usersError = (state: RootState) => state.users.error;

export default usersSlice.reducer;