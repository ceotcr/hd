import Link from 'next/link';
import Logo from './Logo';

const UnAuthorized = () => {
    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white w-full">
            <header className="p-4 bg-[#f1f7ff64] backdrop-blur-lg sticky top-0">
                <nav className="flex container items-center justify-between mx-auto">
                    <Logo />
                    <div className="flex gap-4 items-center">
                        <Link href="/auth/signin" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                            Sign In
                        </Link>
                        <Link href="/auth/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                            Get Started
                        </Link>
                    </div>
                </nav>
            </header>

            <section className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Your Thoughts, <span className="text-blue-600">Simplified</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                    Highway Delite Notes helps you capture ideas instantly and access them anywhere. Lightweight, fast, and always at your fingertips.
                </p>
                <div className="flex justify-center gap-4">
                    <Link href="/auth/signup" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors shadow-md">
                        Start For Free
                    </Link>
                    <Link href="#features" className="text-blue-600 px-6 py-3 rounded-lg text-lg font-medium border border-blue-600 hover:bg-blue-50 transition-colors">
                        Learn More
                    </Link>
                </div>
            </section>

            <section id="features" className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Highway Delite Notes?</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <article className="bg-blue-50 p-6 rounded-xl">
                            <div className="text-blue-600 text-3xl mb-4">⚡</div>
                            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                            <p className="text-gray-600">Capture notes instantly with our optimized interface that loads in milliseconds.</p>
                        </article>
                        <article className="bg-blue-50 p-6 rounded-xl">
                            <div className="text-blue-600 text-3xl mb-4">🔒</div>
                            <h3 className="text-xl font-semibold mb-2">Private</h3>
                            <p className="text-gray-600">Your notes are only accessible to you. We comply with privacy standards.</p>
                        </article>
                        <article className="bg-blue-50 p-6 rounded-xl">
                            <div className="text-blue-600 text-3xl mb-4">🌎</div>
                            <h3 className="text-xl font-semibold mb-2">Access Anywhere</h3>
                            <p className="text-gray-600">Available on all your devices. Pick up where you left off, anytime.</p>
                        </article>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Simplify Your Note-Taking?</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                        Join thousands of users who trust Highway Delite Notes for their daily thoughts and ideas.
                    </p>
                    <Link href="/auth/signup" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors shadow-md">
                        Get Started - It&apos;s Free
                    </Link>
                </div>
            </section>

            <footer className="bg-gray-100 py-8">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                    <Logo />
                    <nav className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy</Link>
                        <Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">Terms</Link>
                        <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</Link>
                    </nav>
                    <p className="text-gray-500 text-sm mt-4 md:mt-0">© {new Date().getFullYear()} Highway Delite Notes. All rights reserved.</p>
                </div>
            </footer>
        </main>
    );
};

export default UnAuthorized;