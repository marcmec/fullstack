import TopBar from "@/features/shared/components/TopBar"

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <main className="flex-1 container mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    )
}

export default PrivateLayout