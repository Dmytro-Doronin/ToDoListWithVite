
import {TaskPriorities, TaskStatus, TaskType} from "../../serverApi/todoListsApi";
import { createSlice } from "@reduxjs/toolkit";
import { todoThunks} from "../todoReducer/todoThunks";

import {addTask, fetchTask, removeTask, updateTask} from "./tasksThunks";


// TYPES


export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    completed?: boolean
    status?: TaskStatus
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type TaskStateType = {
    [key: string]: TaskType[]
}

// REDUCER
const initialState: TaskStateType = {}


const slice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        clearData: (state) => {
            Object.keys(state).forEach(key => delete state[key]);
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTask.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(addTask.fulfilled, (state, action) => {
                let taskForCurrentTodolist = state[action.payload.task.todoListId] as TaskType[]
                taskForCurrentTodolist.unshift(action.payload.task)
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                let taskForCurrentTodolist = state[action.payload.todoListId]
                const index = taskForCurrentTodolist.findIndex(todo => todo.id === action.payload.taskId)
                if (index !== -1) taskForCurrentTodolist.splice(index, 1)
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                let tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(todo => todo.id === action.payload.taskId)
                if (index !== -1 ) tasks[index] = {...tasks[index], ...action.payload.domainModel}
            })
            /// From toDo
            .addCase(todoThunks.addTodoList.fulfilled, (state, action) => {
                state[action.payload.todoList.id] = []
            })
            .addCase(todoThunks.removeTodoList.fulfilled, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(todoThunks.fetchTodoList.fulfilled, (state, action) => {
                action.payload.todoLists.forEach((tl) => {
                    state[tl.id] = []
                })
            })
    }

})


export const taskReducer = slice.reducer
// export const taskActions = slice.actions

