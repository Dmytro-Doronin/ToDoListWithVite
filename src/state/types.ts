// export type SingleTaskType = {
//     id: string,
//     title: string,
//     isDone: boolean
// }

// export type BtnInfoType = {
//     id: string,
//     title: filterType
// }

// export type TaskStateType = {
//     [key: string]: ArrayTaskType
// }
// import {fetchTodoListThunk} from "./todoReducer/todoReducer";
// const { v4: uuidv4 } = require('uuid');
export type TodoType = {
    id: string
    title: string
}
//
//
// // export type ArrayTaskType = Array<SingleTaskType>
// // export type ArrayBtnInfoType = Array<BtnInfoType>
// export type filterType = 'all' | 'active' | 'completed'
//
//
// //ACTION TYPES
//
// export type RemoveTodoActionType = {
//     type: 'DELETE-TODO'
//     id: string
// }
//
// export type AddTodoActionType = {
//     type: 'ADD-TODO'
//     todoId: string
//     title: string
// }
//
// export type ChangeFilterActionType = {
//     type: 'CHANGE-FILTER-TODO'
//     id: string
//     filter: filterType
// }
//
//
// export type SetTodolistsActionType = {
//     type: 'SET-TODOLISTS'
//     todoLists: Array<TodoType>
// }
//
// //ACTION TYPES
//
//
// export type ActionType = RemoveTodoActionType | AddTodoActionType | ChangeFilterActionType | SetTodolistsActionType
//
// //ACTIONS CREATORS
// export const setTodolistsAC = (todoLists: Array<TodoType>): SetTodolistsActionType => {
//     return {type: 'SET-TODOLISTS', todoLists}
// }
// export const deleteTodoAction = (id: string): RemoveTodoActionType => {
//     return {type: 'DELETE-TODO', id}
// }
//
// export const addTodoAction = (title: string): AddTodoActionType => {
//     return {type: 'ADD-TODO', title, todoId: uuidv4()}
// }
//
// export const changeFilterTodoAction = (id: string, filter: filterType): ChangeFilterActionType => {
//     return {type: 'CHANGE-FILTER-TODO', id, filter}
// }
//
// // TASKS TASKS TASKS TASKS TASKS
// type SingleTaskType = {
//     id: string,
//     title: string,
//     isDone: boolean
// }
// export type ArrayTaskType = Array<SingleTaskType>
//
// export type TaskStateType = {
//     [key: string]: ArrayTaskType
// }
//
//
// type AddTaskType = {
//     type: 'ADD-TASK'
//     title: string
//     todoId: string
// }
//
// type RemoveTaskType = {
//     type: 'REMOVE-TASK'
//     id: string
//     todoId: string
// }
//
// type ChangeTaskChecked = {
//     type: 'CHANGE-TASK-CHECKED'
//     id: string
//     todoId: string
// }
//
// type ChangeTitleTaskType = {
//     type: 'CHANGE-TASK-TITLE'
//     title: string
//     id: string
//     todoId: string
// }
//
// export type SetTasksActionType = {
//     type: 'SET-TASKS'
//     tasks: ArrayTaskType
//     todolistId: string
// }
//
// export type ActionTaskType = AddTaskType
//                             | RemoveTaskType
//                             | ChangeTaskChecked
//                             | AddTodoActionType
//                             | RemoveTodoActionType
//                             | ChangeTitleTaskType
//                             | SetTodolistsActionType
//                             | SetTasksActionType
//
// // actions task creator
//
// export const addTaskAction = (title: string, todoId: string): AddTaskType => {
//     return {type: 'ADD-TASK', title, todoId}
// }
//
// export const removeTaskAction = (id: string, todoId: string): RemoveTaskType => {
//     return {type: 'REMOVE-TASK', id, todoId}
// }
//
// export const changeTaskChecked = (id: string, todoId: string): ChangeTaskChecked => {
//     return {type: 'CHANGE-TASK-CHECKED', id, todoId}
// }
//
// export const changeTitleTaskAction = (title: string, id: string, todoId: string): ChangeTitleTaskType => {
//     return {type: 'CHANGE-TASK-TITLE', title, id, todoId}
// }
// export const setTaskAC = (tasks: ArrayTaskType, todolistId: string): SetTasksActionType => {
//     return {type: 'SET-TASKS', tasks, todolistId}
// }

