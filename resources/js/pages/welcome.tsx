
import FeaturedScripts from '@/components/home/FeaturedScripts';
import Footer from '@/components/home/Footer';
import Header from '@/components/home/Header';
import Hero from '@/components/home/Hero';
import ScriptCatalog from '@/components/home/ScriptCatalog';
import ScriptDisplay from '@/components/home/ScriptDisplay';
import { Script } from '@/types';
// import { type SharedData } from '@/types';
// import { Head, Link, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome() {
    // const { auth } = usePage<SharedData>().props;
  const [selectedScript, setSelectedScript] = useState<null | Script>(null);
    return (
        <>
            <Head title="Accueil">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100">
                <Header />
                <main>
                    {selectedScript ? (
                        <ScriptDisplay script={selectedScript} onClose={() => setSelectedScript(null)} />
                    ) : (
                        <>
                            <Hero />
                            <FeaturedScripts onScriptClick={setSelectedScript} />
                            <ScriptCatalog onScriptClick={setSelectedScript} />
                        </>
                    )}
                </main>
                <Footer />
            </div>
            {/* <div className="">
                <header className="">
                    <nav className="">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
            </div> */}
        </>
    );
}
