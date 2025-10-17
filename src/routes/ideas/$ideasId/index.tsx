import { useState } from "react";
import { queryOptions, useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { IdeaContent } from '@/components/custom/ideas/ideasContent';
import { IdeaHeader } from '@/components/custom/ideas/IdeaHeader';
import { getImage } from '@/utils/helper';

import { deleteIdea, fetchIdea } from '@/api/idea';
import { toast } from 'sonner';
import { ArrowLeftIcon, BrushCleaning, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { MoonLoader } from "react-spinners";
import NotFound from "@/components/custom/NotFound";
import { useAuth } from "@/context/AuthContext";

const ideaQueryOptions = (ideasId: string) =>
    queryOptions({
        queryKey: ['idea', ideasId],
        queryFn: () => fetchIdea(ideasId),

    });

const blogData = {
    author: {
        name: "Esther Howard",
        avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
};

export const Route = createFileRoute('/ideas/$ideasId/')({
    component: IdeaDetailsPage,
    loader: async ({ params, context: { queryClient } }) => {
        return queryClient.ensureQueryData(ideaQueryOptions(params.ideasId));
    },
    notFoundComponent: NotFound
});

function IdeaDetailsPage() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { user } = useAuth()

    const { mutateAsync: deleteMutation, isPending, error } = useMutation({
        mutationFn: deleteIdea,
        onSuccess: () => {
            toast(
                <div className="flex items-center mt-2 w-[300px] rounded-md p-2 justify-around">
                    <BrushCleaning className="text-red-600" />
                    <p className="text-lg font-semibold">Idea Deleted Successfully!</p>
                </div>
            );
            navigate({ to: '/ideas' });
        },
        onError: () => {
            console.error("Form submission error", error);
            toast.error("Failed to Delete Idea. Please try again!");
        }
    });

    const handleDelete = async () => {
        await deleteMutation(ideasId);
        setOpen(false);
    };

    const { ideasId } = Route.useParams();


    try {
        const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideasId));
        return (
            <div className="bg-background min-h-screen rounded-2xl">
                <div className="flex justify-between p-6 -mb-4">
                    <Button className="block shadow-lg cursor-pointer hover:shadow-none">
                        <Link className="flex items-center" to="/ideas">
                            <ArrowLeftIcon className="inline-block" />Back To Ideas
                        </Link>
                    </Button>

                    {/* Trigger the Alert Dialog for delete */}
                    {user && user.id === idea?.user && (
                        <AlertDialog open={open} onOpenChange={setOpen}>
                            <div className="flex space-x-2">
                                <Button
                                    variant={'default'}
                                    disabled={isPending}
                                    className="bg-blue-700 hover:bg-blue-800 shadow-lg hover:shadow-none"

                                >
                                    <Link className="flex items-center sm:space-x-2" to={`/ideas/${ideasId}/edit`}>
                                        <Edit />
                                        <p className="hidden sm:block">Edit</p>
                                    </Link>

                                </Button>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        disabled={isPending}
                                        className="flex items-center cursor-pointer shadow-lg hover:shadow-none"
                                        variant="destructive"
                                        onClick={() => setOpen(true)}
                                    >
                                        {isPending ? (
                                            <>
                                                <MoonLoader size={20} color="white" />
                                                <p className="sm:inline hidden">Deleting</p>
                                            </>) : (
                                            <>
                                                <Trash2 className="inline-block" />
                                                <p className="sm:inline hidden">Delete</p>
                                            </>
                                        )}

                                    </Button>
                                </AlertDialogTrigger>

                            </div>


                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure you want to delete this idea?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. Once deleted, this idea cannot be restored.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDelete} className="bg-red-600 text-white">
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}

                </div>

                <div className="mx-auto max-w-4xl px-6 pt-6 pb-12">
                    <IdeaHeader
                        tags={idea.tags}
                        title={idea.title}
                        author={blogData.author}
                        publishedDate={new Date(idea.createdAt).toDateString()}
                        summary={idea.summary}
                    />

                    <div className="mt-8 sm:mt-12">
                        <IdeaContent
                            content={idea.description.split('. ')}
                            coverImage={getImage()}
                        />
                    </div>
                </div>
            </div>
        );

    } catch (error) {
        return (
            <NotFound />
        )
    }

}
