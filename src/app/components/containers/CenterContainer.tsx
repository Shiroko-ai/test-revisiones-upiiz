export default function CenterContainer({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {children}
        </div>
    )
}