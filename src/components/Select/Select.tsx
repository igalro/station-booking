import {ChangeEvent, FC, ReactNode, SelectHTMLAttributes} from 'react';
import {IOption} from '../../types/IOption';

interface Props extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    children: ReactNode;
    label?: string;
    onChange?: (value: string) => void;
    options: IOption[];
}

export const Select: FC<Props> = ({options = [], label, onChange, children, className = '', ...props}) => {
    return (
        <div className={'flex flex-col'}>
            {label && <label htmlFor={props.id} className={'text-gray-400 text-sm'}>{label}</label>}
            <select
                onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange?.(e.target.value)}
                {...props}
                className={'w-full border-2 cursor-pointer rounded ' + className}>
                {options.map(option => <option key={option.id} value={option.id}>{option.name}</option>)}
                {children}
            </select>
        </div>
    );

};