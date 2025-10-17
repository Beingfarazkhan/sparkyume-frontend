import { createFileRoute, Link } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar } from 'lucide-react'
import { fetchAllIdeas } from '@/api/idea'
import { getImage } from '@/utils/helper'

const ideasQueryOption = () => queryOptions({
    queryKey: ['ideas'],
    queryFn: () => fetchAllIdeas()
})

export const Route = createFileRoute('/ideas/')({
    component: IdeasPage,
    loader: async ({ context: { queryClient } }) => {
        return queryClient.ensureQueryData(ideasQueryOption())
    }
})

function IdeasPage() {
    const { data } = useSuspenseQuery(ideasQueryOption())
    const ideas = data.sort((a, b) => { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() })

    return <div className="p-4 mx-auto max-w-(--breakpoint-xl) grid grid-cols-1 sm:grid-cols-2 gap-12">
        {ideas.map((idea) => (
            <Link key={idea._id} to={`/ideas/${idea._id}` as string}>
                <Card
                    className="flex flex-col shadow-md overflow-hidden rounded-md p-4 sm:hover:scale-105 transition"
                >
                    <div className="h-56 sm:h-70 rounded-lg" >
                        <img src={getImage()} className='h-[100%] w-[100%] rounded-lg object-cover' alt="" />
                    </div>
                    <CardContent className="px-0 sm:px-6 py-0 flex flex-col">
                        <div className="flex flex-wrap sm:flex-row items-center gap-6">
                            {idea.tags.map((tag) => (
                                <Badge key={tag} className="bg-primary/5 text-primary hover:bg-primary/5 shadow-md hover:shadow-none p-1">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                        <h3 className="mt-4 text-3xl font-bold tracking-tight">
                            {idea.title}
                        </h3>
                        <p className="mt-2 text-muted-foreground line-clamp-3 text-ellipsis">
                            {idea.summary}
                        </p>
                        <div className="mt-4 flex items-center gap-6 text-muted-foreground text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" /> {new Date(idea.createdAt).toDateString()}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        ))}

    </div>
}
