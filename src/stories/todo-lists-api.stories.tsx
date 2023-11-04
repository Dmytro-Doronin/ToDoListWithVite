import React, {useState, useEffect} from 'react';
import axios from "axios";


export default {
    title: 'API',
} ;

const settings = {
    withCredentials: true
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>([])

    useEffect(() => {
        const request = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)

        request.then(res => setState(res.data))

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodoLists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const title = 'POSTMAN'
        const request = axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, settings)

        request.then(res => setState(res.data))

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodoLists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {


    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodoLists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {


    }, [])

    return <div>{JSON.stringify(state)}</div>
}
