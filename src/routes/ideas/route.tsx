import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/ideas')({
    component: IdeaLayout,
})

function IdeaLayout() {
    return (
        <main className='flex justify-center p-6'>
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg space-y-4">
                <Outlet />
            </div>
        </main>
    )
}
