import prisma from "@/lib/prisma";
import { marked } from "marked";
import appPaths from "@/src/appPaths";

//Component
import { EmblaCarousel } from "@/src/components/web/EmblaCarousel";
import { redirect } from "next/navigation";
import AudioCardWeb from "@/src/components/panel/cards/AudioCardWeb";

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

    return (
        <>
            <div className="w-full h-24" />
            <h1 className="mt-8 text-sky-900 text-4xl text-center md:text-6xl font-bold">
                {suite.title}
            </h1>

            <article
                dangerouslySetInnerHTML={{ __html: HTML }}
                className="prose prose-slate prose-xl mx-auto w-full mt-16 max-w-screen-lg"
            ></article>

            {images ? <EmblaCarousel /> : null}

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
        </>
    );
}
