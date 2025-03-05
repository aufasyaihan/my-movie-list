export default function Chips({ children, style }: { children: React.ReactNode, style?: string }) {
  return (
    <div className={`w-fit bg-neutral-700 text-white px-2 py-1 rounded-md ${style}`}>
      {children}
    </div>
  )
}