import React, {ChangeEvent, useState} from 'react';

type EditSpanType = {
    title: string
    callback: (title: string) => void
}

const EditSpan = React.memo(({title, callback}: EditSpanType) => {
    const [textTitle, setTextTitle] = useState<string>('')
    const [editMode, setEditMode] = useState<boolean>(false)

    const setTextTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTextTitle(e.target.value)
    }

    const activeEditMode = () => {
        setEditMode(true)
        setTextTitle(title)
    }

    const activeViewMode = () => {
        setEditMode(false)
        callback(textTitle)
    }

    return editMode
        ? <input onChange={setTextTitleHandler} onBlur={activeViewMode} value={textTitle} autoFocus/>
        : <span onDoubleClick={activeEditMode}>{title}</span>
});

export default EditSpan;