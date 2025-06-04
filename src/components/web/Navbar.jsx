"use client";
// Dependencies
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

//Styles
import "@/src/styles/components/navbar.css";

export default function Navbar() {
    const pathname = usePathname();
    const [scrollPosition, setScrollPosition] = useState(
        pathname !== "/" ? true : false
    );
    const [burgerOpen, setBurgerOpen] = useState(false);
    const [obrasOpen, setObrasOpen] = useState(false);

    const handleBurger = () => {
        let mobileMenu = document.getElementById("mobile-menu");

        mobileMenu.classList.toggle("is-open");
        setBurgerOpen((prev) => !prev);
    };

    useEffect(() => {
        const updateScrollPosition = () => {
            if (pathname === "/") {
                // If scrolled down past 150px, set scrollPosition to true
                if (window.scrollY >= 150) {
                    setScrollPosition(true);
                } else {
                    setScrollPosition(false);
                }
            } else {
                // If NOT on the homepage, scrollPosition should always be true (solid background)
                setScrollPosition(true);
            }
        };

        // Run once immediately when component mounts or pathname changes
        updateScrollPosition();

        window.addEventListener("scroll", updateScrollPosition);

        return () => {
            window.removeEventListener("scroll", updateScrollPosition);
        };
    }, [pathname]); 

    return (
        <>
            <nav
                className={`fixed w-full ${
                    (!scrollPosition && burgerOpen) || scrollPosition
                        ? "bg-slate-100"
                        : "bg-transparent"
                } h-20 flex items-center z-40 sm:h-24 transition-all duration-300`}
                onMouseLeave={() => setObrasOpen(false)}
            >
                <div className="flex justify-between items-center max-w-screen-xl w-full mx-auto px-4 md:px-12">
                    {" "}
                    <Link
                        href="/"
                        className="flex items-center text-xl font-semibold italic no-underline"
                    >
                        <Image
                            src="/favicon.png"
                            alt="fazb=logo"
                            width={100}
                            height={100}
                            priority={true}
                            className={`w-12 sm:w-16 ${
                                (!scrollPosition && burgerOpen) ||
                                scrollPosition
                                    ? "invert"
                                    : "invert-0"
                            }`}
                        />
                        <span
                            className={`ml-3 font-sans text-xl sm:text-3xl hover:text-sky-800  ${
                                (!scrollPosition && burgerOpen) ||
                                scrollPosition
                                    ? "text-stone-900"
                                    : "text-stone-100"
                            }`}
                        >
                            Francisco Zapata Bello
                        </span>
                    </Link>
                    {/* Burger Icon */}
                    <button onClick={handleBurger} className="lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill=""
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className={`w-10 sm:w-14 ${
                                burgerOpen
                                    ? "text-txMid"
                                    : scrollPosition
                                      ? "text-stone-900"
                                      : "text-stone-100"
                            } transition-all duration-300`}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                            />
                        </svg>
                    </button>
                    {/* Navbar Full */}
                    <div id="desktop-menu" className="hidden lg:block text-2xl">
                        <ul className="flex gap-1 items-center">
                            <Link
                                href="/suites"
                                className={`desktopLink ${
                                    scrollPosition
                                        ? "text-stone-900"
                                        : "text-stone-100"
                                }`}
                                onMouseOver={() => setObrasOpen(true)}
                            >
                                <li className="hover:text-sky-800 hover:underline">
                                    Obras
                                </li>
                            </Link>
                            <ul
                                id="obras-menu"
                                className={`${
                                    scrollPosition
                                        ? "text-stone-900"
                                        : "text-stone-100"
                                } ${
                                    scrollPosition
                                        ? "bg-slate-100"
                                        : "bg-transparent"
                                } absolute top-0 translate-y-16 translate-x-2 transition-discrete transition-opacity duration-400 delay-75 -z-10 px-6 py-4 rounded-b-md ${
                                    obrasOpen
                                        ? "block opacity-20 hover:opacity-100"
                                        : "hidden opacity-0"
                                }`}
                                onMouseLeave={() => setObrasOpen(false)}
                            >
                                <Link
                                    href=""
                                    className={`${
                                        scrollPosition
                                            ? "text-stone-900"
                                            : "text-stone-100"
                                    } desktopSubMenu`}
                                >
                                    <li className="hover:text-sky-800 hover:underline">
                                        Guitarra
                                    </li>
                                </Link>
                                <Link
                                    href=""
                                    className={`${
                                        scrollPosition
                                            ? "text-stone-900"
                                            : "text-stone-100"
                                    } desktopSubMenu`}
                                >
                                    <li className="hover:text-sky-800 hover:underline">
                                        Coral y A Capella
                                    </li>
                                </Link>
                                <Link
                                    href=""
                                    className={`${
                                        scrollPosition
                                            ? "text-stone-900"
                                            : "text-stone-100"
                                    } desktopSubMenu`}
                                >
                                    <li className="hover:text-sky-800 hover:underline">
                                        Música de Cámara
                                    </li>
                                </Link>
                                <Link
                                    href=""
                                    className={`${
                                        scrollPosition
                                            ? "text-stone-900"
                                            : "text-stone-100"
                                    } desktopSubMenu`}
                                >
                                    <li className="hover:text-sky-800 hover:underline">
                                        Orquesta y Cuerdas
                                    </li>
                                </Link>
                                <Link
                                    href=""
                                    className={`${
                                        scrollPosition
                                            ? "text-stone-900"
                                            : "text-stone-100"
                                    } desktopSubMenu`}
                                >
                                    <li className="hover:text-sky-800 hover:underline">
                                        Orquesta y Sinfónica
                                    </li>
                                </Link>
                                <Link
                                    href=""
                                    className={`${
                                        scrollPosition
                                            ? "text-stone-900"
                                            : "text-stone-100"
                                    } desktopSubMenu`}
                                >
                                    <li className="hover:text-sky-800 hover:underline">
                                        Música para Piano
                                    </li>
                                </Link>
                            </ul>
                            <Link
                                href=""
                                className={`desktopLink ${
                                    scrollPosition
                                        ? "text-stone-900"
                                        : "text-stone-100"
                                }`}
                                onMouseEnter={() => setObrasOpen(false)}
                            >
                                <li className="hover:text-sky-800 hover:underline">
                                    Artículos
                                </li>
                            </Link>
                            <Link
                                href=""
                                className={`desktopLink ${
                                    scrollPosition
                                        ? "text-stone-900"
                                        : "text-stone-100"
                                }`}
                            >
                                <li className="hover:text-sky-800 hover:underline">
                                    Blog
                                </li>
                            </Link>
                            <Link
                                href=""
                                className={`desktopLink ${
                                    scrollPosition
                                        ? "text-stone-900"
                                        : "text-stone-100"
                                }`}
                            >
                                <li className="hover:text-sky-800 hover:underline">
                                    Contacto
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                id="mobile-menu"
                onClick={handleBurger}
                className="fixed pt-0 top-20 sm:top-24 left-full w-screen h-screen bg-slate-100/90 transition-all duration-150"
            >
                <ul className="flex flex-col items-center">
                    <ul className="mobileLink">
                        <Link href="" className="mobileLink">
                            <li>Obras</li>
                        </Link>
                        <ul
                            className="transition-all duration-300"
                            id="obras-menu"
                        >
                            <Link href="" className="mobileLink">
                                <li className="font-light">Guitarra</li>
                            </Link>
                            <Link href="" className="mobileLink">
                                <li className="font-light">
                                    Coral y A Capella
                                </li>
                            </Link>
                            <Link href="" className="mobileLink">
                                <li className="font-light">Música de Cámara</li>
                            </Link>
                            <Link href="" className="mobileLink">
                                <li className="font-light">
                                    Orquesta y Cuerdas
                                </li>
                            </Link>
                            <Link href="" className="mobileLink">
                                <li className="font-light">
                                    Orquesta y Sinfónica
                                </li>
                            </Link>
                            <Link href="" className="mobileLink">
                                <li className="font-light">
                                    Música para Piano
                                </li>
                            </Link>
                        </ul>
                    </ul>
                    <Link href="" className="mobileLink">
                        <li>Medios</li>
                    </Link>
                    <Link href="" className="mobileLink">
                        <li>Blog</li>
                    </Link>
                    <Link href="" className="mobileLink">
                        <li>Contacto</li>
                    </Link>
                </ul>
            </div>
        </>
    );
}
