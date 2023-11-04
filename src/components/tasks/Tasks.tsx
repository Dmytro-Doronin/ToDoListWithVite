import React, {ChangeEvent, useCallback} from 'react';
// import {changeTaskChecked} from "../../state/taskReducer/task-type";
import {Checkbox, IconButton} from "@mui/material";
import EditSpan from "../editSpan/EditSpan";
import {Delete} from "@mui/icons-material";
import {removeTask, updateTask} from "../../state/taskReducer/tasksThunks";

import {useAppDispatch} from "../../hooks/reduxHooks";
import {TaskStatus, TaskType} from "../../serverApi/todoListsApi";

type TaskPropType = {
    task: TaskType
    id: string
    todoId: string
    title: string
    changeStatus: (id: string, status: TaskStatus, todolistId: string) => void
}

const Tasks = React.memo((
    {
        id,
        todoId,
        task,
        changeStatus,
    }: TaskPropType) => {
    const dispatch = useAppDispatch()

    const checkedTaskHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.checked
        changeStatus(id, value ? TaskStatus.Completed : TaskStatus.New  ,todoId)
    }, [task.id, todoId])


    const removeTaskHandler = () => {
        dispatch(removeTask({taskId: id, todoListId: todoId}))
    }

    const changStatusEditSpan = useCallback((title: string) => {
        dispatch(updateTask({taskId:id, domainModel: {title}, todolistId:todoId}))
    },[dispatch, id])

    return <div key={id}>
        <Checkbox
            color='primary'
            checked={task.status === TaskStatus.Completed}
            onChange={checkedTaskHandler}
        />
        <EditSpan callback={changStatusEditSpan} title={task.title}/>
        <IconButton onClick={removeTaskHandler}>
            <Delete/>
        </IconButton>
    </div>
});

export default Tasks;