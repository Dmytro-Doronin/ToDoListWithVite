import {Grid, Paper} from "@mui/material";
import AddItemForm from "../../components/addItemForm/AddItemForm";
import TodoList from "../../components/TodoList/TodoList";
import {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";

import {Navigate} from "react-router-dom";
import {TaskStatus} from "../../serverApi/todoListsApi";
import {todoActions} from "../../state/todoReducer/todoReducer";
import {todoThunks} from "../../state/todoReducer/todoThunks";
import {updateTask} from "../../state/taskReducer/tasksThunks";

import c from './todoLists.module.css'



export type ArrayBtnInfoType = Array<BtnInfoType>
export type filterType = 'all' | 'active' | 'completed'


type BtnInfoType = {
    id: string,
    title: filterType
}

export const TodoLists = () => {

    const dispatch = useAppDispatch()
    const todos = useAppSelector(state => state.todo)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const [btnInfo] = useState<ArrayBtnInfoType>([
        {id: '1', title: 'all'},
        {id: '2', title: 'active'},
        {id: '3', title: 'completed'},
    ])

    //CRUD FUNCTION
    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(todoThunks.fetchTodoList())
    }, [dispatch, isLoggedIn])

    const addTodoList = useCallback((title: string) => {
        dispatch(todoThunks.addTodoList({title}))
    }, [dispatch])

    const changeFilter = useCallback((item: filterType, todolistId: string) => {
        const action = todoActions.changeFilterTodo({id: todolistId, filter: item})
        dispatch(action)
    }, [dispatch])

    const deleteTodos = useCallback((todolistId: string) => {
        dispatch(todoThunks.removeTodoList({todolistId}))
    }, [dispatch])

    const changeStatus = useCallback(function (taskId: string, status: TaskStatus, todolistId: string) {
        dispatch(updateTask({taskId, domainModel: {status}, todolistId }))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to='/login'/>
    }
    return <>

        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todos.length === 0 ? <div className={c.alertBlock}>Todo list is empty</div> :
                    todos.map(todo => {

                        return (
                            <Grid item key={todo.id}>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList
                                        changeStatus={changeStatus}
                                        entityStatus={todo.entityStatus}
                                        key={todo.id}
                                        todoId={todo.id}
                                        title={todo.title}
                                        btnInfo={btnInfo}
                                        filter={todo.filter}
                                        changeFilter={changeFilter}
                                        deleteTodos={deleteTodos}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })
            }
        </Grid>

    </>
}