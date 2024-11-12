import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex flex-col">
            <header className="px-4 lg:px-6 h-16 flex items-center justify-between">
                <Link className="flex items-center" href="#">
                    <img className="h-[26px] w-[100px] md:h-[28px] md:w-[120px]" src="/logo.png" alt="logo" />
                </Link>
                <nav className="flex items-center gap-4 sm:gap-6">
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                        Blog
                    </Link>
                    <Button className="bg-black text-white rounded-full" variant="default">
                        <Link href="/sign-in">Get Started</Link>
                    </Button>
                </nav>
            </header>

            <main className="flex flex-col flex-1 items-center px-4 py-10 md:py-20 lg:py-28">
                <section className="w-full max-w-screen-lg text-center space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                            Simplify <span className="text-red-500">PDF</span> <span className="text-blue-500">Note</span>-Taking
                            <br className="hidden md:block" />
                            with AI-Powered Answers
                        </h1>
                        <p className="mx-auto max-w-2xl text-gray-500 text-base md:text-lg lg:text-xl">
                            Elevate your note-taking experience with our AI-powered PDF app. Seamlessly ask any questions get answer from the PDF text context.
                        </p>
                    </div>
                    <div className="space-x-4 flex flex-wrap justify-center">
                        <Button className="bg-black text-white rounded-full px-6 py-3 text-sm sm:text-base">
                            <Link href="/sign-in">Get started</Link>
                        </Button>
                        <Button className="bg-gray-100 text-gray-900 rounded-full px-6 py-3 text-sm sm:text-base" variant="outline">
                            <Link href="/sign-in">Learn more</Link>
                        </Button>
                    </div>
                </section>

                <section className="w-full py-12 md:py-20">
                    <div className="container max-w-screen-lg mx-auto px-4 md:px-6">
                        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 text-center">
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold md:text-2xl">The lowest price</h3>
                                <p className="text-gray-500 text-sm md:text-base">Affordable plans for everyone.</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold md:text-2xl">The fastest on the market</h3>
                                <p className="text-gray-500 text-sm md:text-base">Process documents in seconds.</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold md:text-2xl">The most loved</h3>
                                <p className="text-gray-500 text-sm md:text-base">Highly rated by our users.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
