import IdeaForm from '@/components/custom/ideas/IdeaForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ideas/new/')({
    component: NewIdeaPage,
})

function NewIdeaPage() {
    return <div className='p-8'>
        <h1 className='text-3xl sm:text-4xl font-bold mb-3'>Create New Idea</h1>
        <div className="sm:w-[80%] mx-auto sm:border sm:shadow-md rounded-lg p-2">
            <IdeaForm />
        </div>
    </div>
}
