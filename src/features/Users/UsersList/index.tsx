import {User} from "../../../../models/models.ts";
import UserComponent from "../UserComponent";
import './index.scss'
import { useEffect, useState} from "react";
import {fetchUsers, getUsersStatus, usersError, selectAllUsers} from "../usersSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {UnknownAction} from "@reduxjs/toolkit";


const Index = () => {
    const dispatch = useAppDispatch();
    const usersList: User[] = useAppSelector(selectAllUsers)
    const usersStatus: string = useAppSelector(getUsersStatus);
    const error: string | null = useAppSelector(usersError);

    const [searchSelect, setSearchSelect] = useState<string>('name');
    const [searchInput, setSearchInput] = useState<string>('');

    useEffect(() => {
        dispatch(fetchUsers() as UnknownAction);
    }, [dispatch]);

    let filteredUsers: User[];

    let content;

    if (usersStatus === 'loading') {
        content = <p>Loading...</p>;
    }
    else if (usersStatus === 'succeeded') {

        searchSelect !== 'phone' ?
            filteredUsers = usersList.filter(user =>
                user[searchSelect].toLowerCase().startsWith(searchInput.toLowerCase())
            ) :
            filteredUsers = usersList.filter(user =>
                user[searchSelect].toLowerCase().includes(searchInput.toLowerCase())
            );

        content = filteredUsers.map((user: User) => (
            <UserComponent key={user.id} user={user}/>
        ))
    } else if (usersStatus === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <main className="main">
            <h1>All Users</h1>
            <div className='search-form'>
                <input
                    type="text"
                    value={searchInput}
                    className='search-form__input'
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <select className='search-form__select' value={searchSelect} onChange={(e) => setSearchSelect(e.target.value)}>
                    <option value="name">Name</option>
                    <option value="username">Username</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                </select>
            </div>
            <div className='users-container'>
                <div className='users-box'>
                    <ul className='users-box__list'>
                        {content}
                    </ul>
                </div>
            </div>
        </main>
    );
};

export default Index;