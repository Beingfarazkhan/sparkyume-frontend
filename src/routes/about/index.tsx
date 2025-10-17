import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-10 px-5">
            <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-semibold text-center text-blue-600 mb-4">About Sparkyume</h1>
                <p className="text-lg text-gray-700 leading-relaxed">
                    Sparkyume is an innovative idea-sharing platform designed to foster creativity, collaboration, and community-driven innovation.
                    Whether you're an entrepreneur, student, or someone with a passion for brainstorming, Sparkyume provides a space to share your ideas,
                    receive feedback, and collaborate with like-minded individuals from all around the world.
                </p>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                    <p className="text-lg text-gray-600">
                        Our mission is to democratize the creative process and connect people with diverse perspectives.
                        By giving everyone a platform to share their thoughts, we believe we can spark the next big idea—together.
                    </p>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Why Choose Sparkyume?</h2>
                    <ul className="list-disc list-inside text-lg text-gray-600">
                        <li>Collaborate with individuals who share your passion for creativity.</li>
                        <li>Get instant feedback and refine your ideas in real-time.</li>
                        <li>Access a wide range of tools and resources to bring your ideas to life.</li>
                        <li>Build your network by engaging with a vibrant community of creators and innovators.</li>
                    </ul>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-lg text-gray-700">
                        Join us on Sparkyume and start sharing your ideas today!
                    </p>
                </div>
            </div>
        </div>
    )
}
