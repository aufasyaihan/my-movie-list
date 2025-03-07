interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
}

export default function Input({ id, label, ...props }: InputProps) {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label className="px-1 font-semibold" htmlFor={id}>
                {label}
            </label>
            <input
                id={id}
                className="p-2 bg-neutral-600 rounded-md disabled:text-neutral-500 disabled:bg-neutral-700"
                {...props}
            />
        </div>
    );
}
