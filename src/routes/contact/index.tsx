import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="bg-gray-50 min-h-screen py-10 px-5">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-xl">
                <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Contact Sparkyume</h1>

                {/* Contact Form Section */}
                <div className="space-y-8">
                    <p className="text-lg text-gray-700 text-center mb-8">
                        Got a question, idea, or feedback? Let’s talk! Fill out the form below, and we’ll get back to you soon.
                    </p>

                    <form className="space-y-6">
                        {/* Name Field */}
                        <div className="relative">
                            <label htmlFor="name" className="text-lg font-medium text-gray-800 mb-2">Your Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all transform"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="relative">
                            <label htmlFor="email" className="text-lg font-medium text-gray-800 mb-2">Your Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all transform"
                            />
                        </div>

                        {/* Message Field */}
                        <div className="relative">
                            <label htmlFor="message" className="text-lg font-medium text-gray-800 mb-2">Your Message</label>
                            <textarea
                                id="message"
                                placeholder="Write your message"
                                rows={5}
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all transform"
                            />
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200 transform hover:scale-105"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>

                {/* Embedded Map Section */}
                <div className="mt-16">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Our Location</h2>
                    <div className="w-full h-80 rounded-lg overflow-hidden">
                        <iframe
                            title="Sparkyume Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.7460260076586!2d2.292292315674509!3d48.85884497928771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671d9b5b840d9%3A0x40c91b2c3b4b8b0!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1631909324717!5m2!1sen!2sfr"
                            className="w-full h-full border-0"
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}
