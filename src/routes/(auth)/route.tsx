import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Lightbulb } from 'lucide-react'

export const Route = createFileRoute('/(auth)')({
    component: AuthLayout,
})

function AuthLayout() {
    return (
        <main className='flex justify-center p-6'>
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg space-y-4">
                <div className='flex flex-col md:flex-row items-start justify-between gap-10 p-6'>
                    <div className='hidden  md:flex flex-col items-center justify-center min-h-96 w-[100%] md:w-[50%] space-y-6 bg-gray-950 border-1 p-4 rounded-lg'>
                        <Lightbulb className='w-16 h-16 text-amber-300' />
                        <h1 className='text-5xl font-bold text-gray-100'>SparkYume</h1>
                        <p className='text-gray-300 text-lg'>Ignite Ideas. Spark The Future</p>
                        <strong className='text-sm text-gray-200'>Share | Explore | Build</strong>
                    </div>
                    <div className='md:hidden flex flex-row justify-center items-center w-[100%]'>
                        <Lightbulb className='w-10 h-10 text-gray-950' />
                        <h1 className='text-3xl font-bold text-gray-900'>SparkYume</h1>

                    </div>
                    <section className='flex-1 w-[100%] md:w-[50%]'>
                        <Outlet />
                    </section>
                </div>
            </div>
        </main>
    )
}
