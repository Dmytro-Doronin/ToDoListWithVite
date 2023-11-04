import { TaskType, todoListApi, UpdateTaskModel} from "../../serverApi/todoListsApi";

import {UpdateDomainTaskModelType} from './tasksReducer'
import {appActions} from "../appReducer/appReducer";
import { hendleServerNetworkError} from "../../utils/error-utils";
import {createAppAsyncThunk} from "../../utils/createAppAthunkThunk";
import {thunkTryCatch} from "../../utils/try-catch-utils";
import {todoActions} from "../todoReducer/todoReducer";


// THUNKS
//1 - what return
//2 - what does it take
//3 rootstate, dispatch

export const fetchTask = createAppAsyncThunk<{tasks: TaskType[], todolistId: string}, string>(
    'task/fetchTask',
    async (todolistId, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI

        return thunkTryCatch(thunkAPI, async () => {
            const res = await todoListApi.getTasks(todolistId)
            const tasks = res.data.items
            return {tasks, todolistId}
        })

    })

export const addTask = createAppAsyncThunk<{ task: TaskType },{title: string, todoId: string}>
('task/addTask', async (arg,thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    return thunkTryCatch(thunkAPI, async () => {
        const response = await todoListApi.postTask(arg.title, arg.todoId)
        if (response.data.resultCode === 0) {
            dispatch(appActions.setStatus({status: "successed"}))
            // dispatch(taskActions.addTask(response.data.data.item))
            const task = response.data.data.item
            return {task}

        } else {
            // dispatch(appActions.setError({error: response.data.messages[0]}))
            hendleServerNetworkError(response.data.messages, dispatch);
            return rejectWithValue(null)
        }
    })

})

export const removeTask = createAppAsyncThunk<{taskId: string, todoListId: string}, {taskId: string, todoListId: string}>(
    'task/removeTask', async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI


        return thunkTryCatch(thunkAPI, async () => {
            dispatch(todoActions.changeEntityStatus({id: arg.taskId, entityStatus: "loading"}))
            const response = await todoListApi.deleteTask(arg.taskId, arg.todoListId)
            if (response.data.resultCode === 0) {
                dispatch(todoActions.changeEntityStatus({id: arg.taskId, entityStatus: "successed"}))
                dispatch(appActions.setStatus({status: "successed"}))
                return arg

            } else {
                hendleServerNetworkError(response.data.messages, dispatch);
                dispatch(todoActions.changeEntityStatus({id: arg.taskId, entityStatus: "successed"}))
                return rejectWithValue(null)
            }
        })

    }
)

export const updateTask = createAppAsyncThunk<{
    todolistId: string,
    taskId: string,
    domainModel: UpdateDomainTaskModelType
},
    {
        taskId: string,
        domainModel: UpdateDomainTaskModelType,
        todolistId: string
    }>(
    'task/updateTask', async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue, getState} = thunkAPI

        try {
            dispatch(appActions.setStatus({status: 'loading'}))
            const state = getState()
            const task = state.task[arg.todolistId].find(t => t.id === arg.taskId)
            if (!task) {
                //throw new Error("task not found in the state");
                console.warn('task not found in the state')
                return rejectWithValue(null)
            }
            const apiModel: UpdateTaskModel = {
                deadline: task.deadline,
                description:task.description,
                completed: task.completed,
                priority: task.priority,
                startDate: task.startDate,
                title: task.title,
                status: task.status,
                ...arg.domainModel
            }

            const response = await todoListApi.updateTask(arg.todolistId, arg.taskId, apiModel)
            if (response.data.resultCode === 0) {
                const {todolistId,taskId, domainModel} = arg
                return arg
            } else {
                hendleServerNetworkError(response.data.messages, dispatch);
                return rejectWithValue(null)

            }
        } catch (e) {
            const error = (e as {message: string})
            hendleServerNetworkError(error, dispatch);
            return rejectWithValue(null)
        } finally {
            dispatch(appActions.setStatus({status: 'idle'}))
        }

    }
)

export const taskThunks = {fetchTask, addTask, removeTask, updateTask}