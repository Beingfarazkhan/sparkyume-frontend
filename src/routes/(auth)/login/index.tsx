import LoginForm from '@/components/custom/auth/LoginForm'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/login/')({
    component: LoginPage,
})

function LoginPage() {
    return (
        <div >
            <h1 className='text-3xl md:text-4xl font-bold'>Login</h1>
            <LoginForm />
            <p className='text-gray-700'>
                Do not have an account? <Link className='group text-blue-900 transition-all duration-300 ease-in-out' to='/register'>
                    <span className="bg-left-bottom bg-gradient-to-r from-blue-950 to-blue-950 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                        Register Here
                    </span>
                </Link>
            </p>

        </div>
    )
}
