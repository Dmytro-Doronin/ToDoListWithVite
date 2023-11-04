import { RequestStatusType} from "../appReducer/appReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todoListApi} from "../../serverApi/todoListsApi";
import {createAppAsyncThunk} from "../../utils/createAppAthunkThunk";
import {hendleServerNetworkError} from "../../utils/error-utils";
import {thunkTryCatch} from "../../utils/try-catch-utils";
import { todoThunks } from './todoThunks'

//TYPES

export type filterType = 'all' | 'active' | 'completed'

export type TodoListDomainType = TodoListType & {
    filter: filterType,
    entityStatus: RequestStatusType
}

export type TodoListType = {
    addedDate: string
    id: string
    order: number
    title: string
}

//SLICE

const initialState: Array<TodoListDomainType> = []

const slice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        changeFilterTodo: (state, action:PayloadAction<{id: string, filter: filterType}>) => {
            const index = state.findIndex((item) => item.id === action.payload.id)
            if (index !== -1) state[index].filter = action.payload.filter
        },
        changeTitleTodo: (state, action:PayloadAction<{id: string, title: string}>) => {
            const index = state.findIndex((item) => item.id === action.payload.id)
            if (index !== -1) state[index].title = action.payload.title
        },
        changeEntityStatus: (state, action:PayloadAction<{id: string, entityStatus: RequestStatusType}>) => {
            const index = state.findIndex((item) => item.id === action.payload.id)
            if (index !== -1) state[index].entityStatus= action.payload.entityStatus
        },
        clearData: (state) => {
            state.length = 0
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(todoThunks.fetchTodoList.fulfilled, (state, action) => {
                return action.payload.todoLists.map((item) => ({...item, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(todoThunks.addTodoList.fulfilled, (state, action) => {
                const newTodo = {...action.payload.todoList, filter: 'all', entityStatus: 'idle'} as TodoListDomainType
                state.unshift(newTodo)
            })
            .addCase(todoThunks.removeTodoList.fulfilled, (state, action) => {
                const index = state.findIndex((item) => item.id === action.payload.todolistId)
                if (index !== -1) state.splice(index, 1)
            })
    }

})

// const fetchTodoList = createAppAsyncThunk<{ todoLists: TodoListType[]}, void>(
//     'todo/fetchTodoList', async (arg, thunkAPI) => {
//         const {dispatch, rejectWithValue} = thunkAPI
//
//         return thunkTryCatch(thunkAPI, async () => {
//             const response = await todoListApi.getTodoLists()
//             return {todoLists: response.data}
//         })
//
//     })
//
//
//
// const addTodoList = createAppAsyncThunk<{todoList: TodoListType}, { title: string }>(
//     'todo/addTodoList', async (arg, thunkAPI) => {
//         const {dispatch, rejectWithValue} = thunkAPI
//
//         return thunkTryCatch(thunkAPI, async () => {
//             const response = await todoListApi.postTodoLists(arg.title)
//             const todoList = response.data.data.item
//             return {todoList}
//         })
//
//     }
// )
//
// const removeTodoList = createAppAsyncThunk<{ todolistId: string }, { todolistId: string }>(
//     'todo/removeTodoList', async (arg, thunkAPI) => {
//         const {dispatch, rejectWithValue} = thunkAPI
//
//         return thunkTryCatch(thunkAPI, async () => {
//             const response = await todoListApi.deleteTodo(arg.todolistId)
//             if (response.status === 200) {
//                 const todolistId = arg.todolistId
//                 return {todolistId}
//             } else {
//                 hendleServerNetworkError(response.data.messages, dispatch);
//                 return rejectWithValue(null)
//             }
//         })
//
//
//     }
// )



export const todoReducer = slice.reducer
export const todoActions = slice.actions
// export const todoThunks =  {fetchTodoList, addTodoList,removeTodoList}




