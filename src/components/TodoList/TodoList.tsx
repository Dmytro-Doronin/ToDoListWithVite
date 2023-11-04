import React, {useCallback, useEffect} from 'react';
import {ArrayBtnInfoType, filterType} from "../../pages/todoLists/TodoLists";
import {Button, IconButton} from "@mui/material";
import Tasks from "../tasks/Tasks";
import AddItemForm from "../addItemForm/AddItemForm";
import {Delete} from '@mui/icons-material'
import c from "./todoList.module.css";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {RequestStatusType} from "../../state/appReducer/appReducer";
import {TaskStatus} from "../../serverApi/todoListsApi";
import {addTask, fetchTask} from "../../state/taskReducer/tasksThunks";

type ToDoPropsType = {
    todoId: string
    title: string
    filter: filterType
    changeFilter: (item: filterType, todolistId: string) => void
    btnInfo: ArrayBtnInfoType
    deleteTodos: (id: string) => void
    entityStatus: RequestStatusType
    changeStatus: (id: string, status: TaskStatus, todolistId: string) => void

}

const TodoList = React.memo((
    {
        todoId,
        title,
        filter,
        btnInfo,
        changeFilter,
        deleteTodos,
        entityStatus,
        changeStatus

    }: ToDoPropsType
) => {
    const tasks = useAppSelector(state => state.task[todoId])
    const dispatch = useAppDispatch()


    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTask({title, todoId}))
    }, [dispatch, todoId])

    let allTodolistTasks = tasks
    let tasksForToDoList = allTodolistTasks

    if (filter === 'active') {
        tasksForToDoList = allTodolistTasks.filter(tasks => tasks.status === TaskStatus.New)
    }

    if (filter === 'completed') {
        tasksForToDoList = allTodolistTasks.filter(tasks => tasks.status === TaskStatus.Completed)
    }


    const btnInfoList = btnInfo.map(item => {
        const changeFilterHandler = () => changeFilter(item.title, todoId)
        const btnClasses = filter === item.title ? `${c.btn} ${c.btnActive}` : ''
        return <Button variant="contained"
                       className={btnClasses}
                       style={{marginRight: '5px'}}
                       onClick={changeFilterHandler}
                       color={filter === item.title ? 'secondary' : 'primary'}
                       key={item.id}
                        >{item.title}
                </Button>
    })

    //delete task
    const deleteTodoHandler = () => deleteTodos(todoId)

    useEffect(()=> {
        dispatch(fetchTask(todoId))
    }, [])

    return (
        <div>
            <h3>{title}
                <IconButton disabled={entityStatus === "loading"} onClick={deleteTodoHandler}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm disabled={entityStatus === "loading"} addItem={addTaskHandler}/>
            <div>
                {   tasksForToDoList.length ?

                    tasksForToDoList.map((task) => {
                       return <Tasks
                           changeStatus={changeStatus}
                           task={task}
                           key={task.id}
                           id={task.id}
                           todoId={todoId}
                           title={task.title}/>
                    })
                    : <div className={c.alertEmptyTask}>Tasks list is empty</div>

                }
            </div>
            <div>
                {btnInfoList}
            </div>
        </div>
    );
});

export default TodoList;