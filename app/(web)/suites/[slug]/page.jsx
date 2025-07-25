import prisma from "@/lib/prisma";
import Link from "next/link";
import { marked } from "marked";
import appPaths from "@/src/appPaths";

//Component
import { EmblaCarousel } from "@/src/components/web/EmblaCarousel";
import { redirect } from "next/navigation";
import AudioCardWeb from "@/src/components/web/cards/AudioCardWeb";
import { GrPrevious } from "react-icons/gr";

export async function generateMetadata({ searchParams }) {
    const params = await searchParams;
    return {
        title: params.title,
    };
}

export default async function SuitePage({ params }) {
    const { slug } = await params;

    const suite = await prisma.suite.findUnique({
        where: { slug },
    });

    //Redirects if no suite or unpublished
    if (!suite || suite.published === false) redirect(appPaths.suites());

    const HTML = marked.parse(suite.notes ? suite.notes : "");

    const images = JSON.parse(suite.images)?.map((item) => item.filePath);

    const audios = JSON.parse(suite.audios)?.map((item) => item.filePath);
    const audiosDescription = JSON.parse(suite.audios)?.map(
        (item) => item.fileDescription
    );
    const ytLinks = JSON.parse(suite.ytLinks);
    const movs = JSON.parse(suite.mov);

    return (
        <>
            <div className="w-full h-24" />

            <div className="text-sky-900 font-bold flex justify-end max-w-screen-lg mx-auto my-8">
                <Link
                    href="/suites"
                    className="group inline-flex items-center text-2xl md:text-4xl no-underline transition-transform duration-300 hover:scale-105"
                >
                    <GrPrevious className="size-8 md:size-10  text-sky-900 group-hover:text-sky-600 transition-colors duration-300" />
                    <span className="ml-2 text-sky-900 group-hover:text-sky-600 transition-colors duration-300">
                        Volver
                    </span>
                </Link>
            </div>

            <h1 className="mt-8 text-sky-900 text-4xl text-center md:text-6xl font-bold">
                {suite.title}
            </h1>

            <div className="font-bold flex flex-col max-w-screen-lg mx-auto mt-12">
                <h3 className="text-xl md:text-2xl">
                    Composición: {suite.composedInit
                        ? `${suite.composedInit} - ${suite.composed}`
                        : suite.composed}
                </h3>
            </div>

            {suite.rev ? (
                <div className="font-bold flex flex-col max-w-screen-lg mx-auto mt-4">
                    <h3 className="text-xl md:text-2xl">
                        Última revisión: {suite.rev}
                    </h3>
                </div>
            ) : null}

            {suite.timeLength ? (
                <div className="font-bold flex flex-col max-w-screen-lg mx-auto mt-4">
                    <h3 className="text-xl md:text-2xl">
                        Duración: ~{suite.timeLength}
                    </h3>
                </div>
            ) : null}

            {movs ? (
                <div className="font-bold flex flex-col max-w-screen-lg mx-auto mt-8">
                    <h2 className="text-2xl md:text-4xl">Movimientos</h2>
                    <ul className="mt-4 ml-8 list-disc list-inside">
                        {movs.map((mov, index) => (
                            <li key={"mov" + index} className="mt-2 text-xl">
                                {mov}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}

			<hr className="my-12 w-full max-w-screen-lg mx-auto text-gray-300"/>

            <article
                dangerouslySetInnerHTML={{ __html: HTML }}
                className="prose prose-slate prose-xl mx-auto w-full max-w-screen-lg"
            ></article>

            {images ? <EmblaCarousel images={images} /> : null}

            <div className="max-w-screen-lg my-12 w-full mx-auto space-y-8">
                {audios
                    ? audios.map((audio, index) => (
                          <AudioCardWeb
                              key={"audio_car_web" + index}
                              audio={audio}
                              description={audiosDescription[index]}
                          />
                      ))
                    : null}
            </div>

            <div className="my-16 space-y-4 max-w-screen-lg mx-auto">
                {ytLinks
                    ? ytLinks.map((video, index) => (
                          <div
                              className="w-full aspect-video overflow-hidden rounded-md"
                              key={`ytVideo-${index}`}
                          >
                              <iframe
                                  loading="lazy"
                                  className="w-full h-full"
                                  src={`https://www.youtube.com/embed/${video}`}
                                  title="YouTube video player"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  referrerPolicy="strict-origin-when-cross-origin"
                                  allowFullScreen
                              ></iframe>
                          </div>
                      ))
                    : null}
            </div>

            <div className="text-sky-900 font-bold flex justify-end max-w-screen-lg mx-auto my-8">
                <Link
                    href="/suites"
                    className="group inline-flex items-center text-2xl md:text-4xl no-underline transition-transform duration-300 hover:scale-105"
                >
                    <GrPrevious className="size-8 md:size-10  text-sky-900 group-hover:text-sky-600 transition-colors duration-300" />
                    <span className="ml-2 text-sky-900 group-hover:text-sky-600 transition-colors duration-300">
                        Volver
                    </span>
                </Link>
            </div>
        </>
    );
}
