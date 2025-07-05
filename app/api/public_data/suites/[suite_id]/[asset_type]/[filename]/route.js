import path from "path";
import { stat, createReadStream } from "fs";
import { promisify } from "util";

const statAsync = promisify(stat);

// MIME type mapper
function getContentType(path) {
    const ext = path.split(".").pop().toLowerCase();
    const types = {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        mp3: "audio/mpeg",
        mp4: "video/mp4",
        webp: "image/webp",
        wav: "audio/wav",
    };
    return types[ext] || "application/octet-stream"; // Fallback
}


export async function GET(req, { params }) {
    const { suite_id, asset_type, filename } = await params;

    const safePath = path.resolve(
		process.cwd(),
        "public_data",
        "suites",
        suite_id,
        asset_type,
        filename
    );

    try {
        const fileStats = await statAsync(safePath);
        if (!fileStats.isFile()) {
            return new Response("Not a file", { status: 404 });
        }

        const fileSize = fileStats.size;
        const contentType = getContentType(safePath);
        
        // Check for Range header
        const range = req.headers.get("range");

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunksize = (end - start) + 1;
            
            // Create stream for the requested chunk
            const stream = createReadStream(safePath, { start, end });

            // Return a 206 Partial Content response
            return new Response(stream, {
                status: 206,
                headers: {
                    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": chunksize,
                    "Content-Type": contentType,
                },
            });

        } else {
            // If no range, send the full file (initial load)
            const stream = createReadStream(safePath);
            
            return new Response(stream, {
                status: 200,
                headers: {
                    "Content-Length": fileSize,
                    "Content-Type": contentType,
                    // Signal that we accept range requests
                    "Accept-Ranges": "bytes", 
                },
            });
        }

    } catch (err) {
        // More specific error logging can be helpful
        console.error(err); 
        return new Response("File not found or error reading file", { status: 404 });
    }
}