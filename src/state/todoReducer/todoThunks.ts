import {createAppAsyncThunk} from "../../utils/createAppAthunkThunk";
import {thunkTryCatch} from "../../utils/try-catch-utils";
import {todoListApi} from "../../serverApi/todoListsApi";
import {hendleServerNetworkError} from "../../utils/error-utils";
import {TodoListType} from "./todoReducer";
import {appActions, appReducer} from "../appReducer/appReducer";
import {todoActions} from "./todoReducer";

const fetchTodoList = createAppAsyncThunk<{ todoLists: TodoListType[]}, void>(
    'todo/fetchTodoList', async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI

        return thunkTryCatch(thunkAPI, async () => {
            const response = await todoListApi.getTodoLists()
            return {todoLists: response.data}
        })

    })

const addTodoList = createAppAsyncThunk<{todoList: TodoListType}, { title: string }>(
    'todo/addTodoList', async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI

        return thunkTryCatch(thunkAPI, async () => {
            const response = await todoListApi.postTodoLists(arg.title)
            const todoList = response.data.data.item
            return {todoList}
        })

    }
)

const removeTodoList = createAppAsyncThunk<{ todolistId: string }, { todolistId: string }>(
    'todo/removeTodoList', async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI

        return thunkTryCatch(thunkAPI, async () => {
            dispatch(todoActions.changeEntityStatus({id: arg.todolistId, entityStatus: "loading"}))
            const response = await todoListApi.deleteTodo(arg.todolistId)
            if (response.status === 200) {
                const todolistId = arg.todolistId
                dispatch(todoActions.changeEntityStatus({id: arg.todolistId, entityStatus: "successed"}))
                return {todolistId}
            } else {
                hendleServerNetworkError({message: response.data.messages[0]}, dispatch);
                dispatch(todoActions.changeEntityStatus({id: arg.todolistId, entityStatus: "successed"}))
                return rejectWithValue(null)
            }
        })


    }
)

export const todoThunks =  {fetchTodoList, addTodoList, removeTodoList}