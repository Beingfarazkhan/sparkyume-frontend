import {
    toast
} from "sonner"
import {
    useForm
} from "react-hook-form"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import {
    z
} from "zod"
import {
    Button
} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Input
} from "@/components/ui/input"
import { CircleX, EyeClosedIcon, EyeIcon, UserCheck } from 'lucide-react'
import { useState } from 'react'
import { useMutation } from "@tanstack/react-query"
import { registerUser } from "@/api/user"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "@tanstack/react-router"
import { MoonLoader } from "react-spinners"



const formSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.email(),
    password: z.string().min(6)
});

function RegisterForm() {
    const navigation = useNavigate()
    const [showPass, setShowPass] = useState(false)
    const { setAccessToken, setUser } = useAuth()

    const { isPending, mutateAsync } = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            setUser(data.user)
            setAccessToken(data.accessToken)
            toast(
                <div className="text-lg font-semibold flex flex-row justify-center gap-4 p-6 mx-auto">
                    <UserCheck className="w-10 text-green-500" />
                    <p>User Registered</p>
                </div>
            )
            navigation({ to: '/ideas' })
        },
        onError: (err) => {
            <div className="text-lg font-semibold flex flex-row justify-center gap-4 p-6 mx-auto">
                <CircleX className="w-10 text-red-600" />
                <p>{err.message}</p>
            </div>
        }
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            mutateAsync(values)
        } catch (error) {
            console.error("Form submission error", error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mx-auto py-10">

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="John Smith"

                                    type="text"
                                    {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="user@email.com"

                                    type="email"
                                    {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <div className='flex flex-row justify-between gap-1'>
                                <FormControl>
                                    <Input
                                        placeholder="Password..."
                                        type={showPass ? 'text' : 'password'}
                                        {...field} />
                                </FormControl>
                                <div className='my-auto'>
                                    {showPass ? (
                                        <EyeIcon size={25} onClick={() => {
                                            setShowPass(!showPass)
                                        }} className='cursor-pointer' />
                                    ) : (
                                        <EyeClosedIcon onClick={() => {
                                            setShowPass(!showPass)
                                        }} className='cursor-pointer ' />
                                    )}
                                </div>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isPending} type="submit" className="w-full md:w-min cursor-pointer shadow-lg hover:shadow-none">{isPending ? (
                    <div className="flex space-x-2 items-center">
                        <p className="text-muted">Registering...</p>
                        <MoonLoader color="white" size={20} />
                    </div>
                ) : 'Register'}</Button>
            </form>
        </Form>
    )
}
export default RegisterForm