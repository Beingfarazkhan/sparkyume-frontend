import RegisterForm from '@/components/custom/auth/RegisterForm'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/register/')({
    component: RegisterPage,
})

function RegisterPage() {
    return (
        <div>
            <h1 className='text-3xl md:text-4xl font-bold'>Register</h1>
            <RegisterForm />
            <p className='text-gray-700'>
                Already have an account? <Link className='group text-blue-900 transition-all duration-300 ease-in-out' to='/login'>
                    <span className="bg-left-bottom bg-gradient-to-r from-blue-950 to-blue-950 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                        Login
                    </span>
                </Link>
            </p>

        </div>
    )
}