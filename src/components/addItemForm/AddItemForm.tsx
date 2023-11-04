import React, {ChangeEvent, useState} from 'react';
import {TextField, IconButton} from "@mui/material";

import c from './addItemForm.module.css'

type AddItemFormType = {
    addItem: (title: string) => void,
    disabled?: boolean
}

const AddItemForm = React.memo(({addItem, disabled}: AddItemFormType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const taskTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        setTitle(e.target.value)
    }

    const addTaskHandler = () => {
        if (title.trim().length === 0) {
            setError('Введите название!')
            return
        }
        addItem(title)
        setTitle('')
    }

    const errorInputClass = error ? c.errorInput : ''
    // const errorBlock = error ? <div className={c.errorText}>{error}</div> : null

    return (
        <div className={c.addItemForm}>
            <div className={c.addItemFormWrapper}>
                <TextField
                    variant='outlined'
                    className={errorInputClass}
                    value={title}
                    onChange={taskTextHandler}
                    error={!!error}
                    helperText={error}
                    disabled={disabled}
                />
                <IconButton disabled={disabled} color='primary' onClick={addTaskHandler}>+</IconButton>
            </div>
            {/*{errorBlock}*/}
        </div>
    );
});

export default AddItemForm;