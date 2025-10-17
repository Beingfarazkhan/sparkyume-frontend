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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Input
} from "@/components/ui/input"
import {
    Textarea
} from "@/components/ui/textarea"
import { createNewIdea } from "@/api/idea"
import { CheckCircle } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"
import { useMutation } from "@tanstack/react-query"
import { MoonLoader } from 'react-spinners'

const formSchema = z.object({
    title: z.string().min(1),
    description: z.string(),
    summary: z.string().min(1),
    tags: z.string().min(1)
});

export default function IdeaForm() {
    const navigate = useNavigate()

    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: createNewIdea,
        onSuccess: () => {
            toast(
                <div className="flex items-center mt-2 w-[250px] rounded-md p-2 justify-between">
                    <CheckCircle className="text-green-500" />
                    <p className="text-lg font-semibold">New Idea Created Successfully!</p>
                </div>
            );
            navigate({ to: '/ideas' })
        },
        onError: () => {
            console.error("Form submission error", error);
            toast.error("Failed to create new idea. Please try again.");
        }
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {

        const data = { ...values, tags: new Array(...new Set(values.tags.split(',').map((tag) => tag.trim()).filter(Boolean))) }
        await mutateAsync(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter Title..."

                                    type="text"
                                    {...field} />
                            </FormControl>
                            <FormDescription>Title for your idea</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter Description..."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>Description for your idea</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Summary</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter Summary..."

                                    type="text"
                                    {...field} />
                            </FormControl>
                            <FormDescription>Summary of your idea</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter Tags..."

                                    type="text"
                                    {...field} />
                            </FormControl>
                            <FormDescription>Add tags separated by ,</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isPending} type="submit">{isPending ? (
                    <div className="flex space-x-2 items-center">
                        <p className="text-muted">Submitting</p>
                        <MoonLoader color="white" size={20} />
                    </div>
                ) : 'Submit'}</Button>
            </form>
        </Form>
    )
}