import { fetchIdea } from '@/api/idea'
import Forbidden from '@/components/custom/Forbidden'
import IdeaEditForm from '@/components/custom/ideas/IdeaEditForm'
import NotFound from '@/components/custom/NotFound'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'


const ideaQueryOptions = (ideasId: string) => queryOptions({
    queryKey: ['idea', ideasId],
    queryFn: () => fetchIdea(ideasId)
})

export const Route = createFileRoute('/ideas/$ideasId/edit')({
    component: RouteComponent,
    loader: async ({ params, context: { queryClient } }) => {
        return queryClient.ensureQueryData(ideaQueryOptions(params.ideasId))
    }
})

function RouteComponent() {
    const { ideasId } = Route.useParams()
    const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideasId))

    const { user } = useAuth()

    if (!idea) {
        return <NotFound />
    }

    if (user?.id !== idea?.user) {
        return (
            <Forbidden />
        )
    } else {
        return <div className='p-8'>
            <Button className="block mb-4 shadow-lg cursor-pointer hover:shadow-none">
                <Link className="flex items-center" to={`/ideas/${ideasId}`}>
                    <ArrowLeftIcon className="inline-block" />Back To Idea
                </Link>
            </Button>
            <h1 className='text-3xl sm:text-4xl font-bold mb-3'>Edit Idea</h1>
            <IdeaEditForm ideasId={idea._id} idea={idea} />
        </div>
    }


}
