import React, {ChangeEvent, KeyboardEvent} from 'react';

type PropsType = {
    callBack: (title: string) => void;
    title: string;
    setTitle: (s: string) => void;
}
export const Input = ({title, setTitle, callBack, ...props}: PropsType) => {

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            callBack(title);
            setTitle('');
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        <input
            type="text"
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
        />
    )
}