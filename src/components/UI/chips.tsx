interface ChipsProps {
    children: React.ReactNode;
    type: string;
    style?: string;
}

const bgColors: Record<ChipsProps["type"], string> = {
    age: "bg-red-700",
    lang: "bg-blue-700",
    status: "bg-green-700",
    genre: "bg-neutral-700",
};

export default function Chips({ children, type, style, ...props }: ChipsProps) {
    return (
        <button
            {...props}
            className={`w-fit ${
                bgColors[type] || "bg-neutral-700"
            } text-white px-2 py-1 rounded-md ${style}`}
        >
            {children}
        </button>
    );
}
