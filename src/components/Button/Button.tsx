import {FC, ReactNode} from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export const Button: FC<Props> = ({children, disabled, className = '', ...props}) => {
    return (
        <button
            disabled={disabled}
            {...props}
            className={`btn btn-primary bg-sky-900 text-white py-1 px-2 rounded ${disabled ? 'text-gray-400' : 'hover:bg-sky-700'} ${className}`}>
            {children}
        </button>
    );
};