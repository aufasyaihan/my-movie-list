export default function Video({ name, id } : { name: string, id: string }) {
    return (
        <div className="flex flex-col gap-4 items-center justify-start w-full">
            <iframe
                width="100%"
                height="350"
                src={`https://www.youtube.com/embed/${id}`}
                title={name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
            />
        </div>
    );
}
