
import AppHeader from "./app-header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="space-y-4 flex flex-col h-screen">
            <AppHeader />
            <main className="my-4 p-4 px-20 flex-1">{children}</main>
        </div>
    );
}

