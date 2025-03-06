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
                className="p-2 bg-neutral-700 rounded-md"
                {...props}
            />
        </div>
    );
}
