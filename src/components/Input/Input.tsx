import {FC, InputHTMLAttributes} from 'react';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    onChange?: (value: string) => void;
}

export const Input: FC<Props> = ({onChange, ...props}) => {
    return (
        <input
            {...props}
            onChange={(e) => onChange?.(e.target.value)}
            className={'w-full p-1 border-2 rounded'}
        />
    );

};