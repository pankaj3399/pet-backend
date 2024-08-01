import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import requestIp from "request-ip";
import { rateLimit } from "express-rate-limit";
import morganMiddleware from "./logger/morgan.logger.js";
import { errorHandler } from "./middlewares/error.middleware.js";

import indexRouter from "./routes/index.js";

const app = express();
const httpServer = createServer(app);

app.use(cors());

/*
`requestIp.mw()` is middleware that attaches the IP address of the client to the `req` object as `req.clientIp`. 
*/
app.use(requestIp.mw());

// Rate limiter to avoid misuse of the service and avoid cost spikes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // Limit each IP to 500 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    keyGenerator: (req, res) => {
        return req.clientIp; // IP address from requestIp.mw(), as opposed to req.ip
    },
    handler: (_, __, ___, options) => {
        throw new ApiError(
            options.statusCode || 500,
            `There are too many requests. You are only allowed ${options.max
            } requests per ${options.windowMs / 60000} minutes`
        );
    },
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.use(express.json({ limit: "16kb" }));
/*
express.urlencoded(): This is a built-in middleware function provided by the Express.js framework. It is used to parse incoming request bodies containing URL-encoded form data. When included in the middleware chain using app.use(), it parses the req object's body as URL-encoded data and exposes the resulting key-value pairs on req.body.

{ extended: true, limit: "16kb" }: These are options passed to the express.urlencoded() middleware function.
extended: true: This option specifies whether the URL-encoded data parser should use the querystring library (querystring) or the more modern qs library to parse the URL-encoded data. When set to true, the parser uses the qs library, allowing for richer functionality such as nested objects and arrays in form data. If set to false, the parser uses the querystring library, which is simpler and more traditional. Setting it to true enables support for parsing nested objects and arrays, but it also makes parsing slightly more complex.

limit: "16kb": This option specifies the maximum size of the URL-encoded form data that the middleware will accept and parse. If the request body exceeds this limit, the middleware will generate an error response. The value "16kb" indicates that the limit is set to 16 kilobytes. You can adjust this value according to your application's needs.
*/
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
/*
app.use(express.static("public")); mounts the express.static() middleware to the Express application, instructing it to serve static files from the "public" directory. Any files placed in the "public" directory can be accessed by clients by specifying the appropriate URL path relative to the root of the server. For example, if there's a file named "styles.css" in the "public" directory, it can be accessed by clients at the URL "/styles.css".
*/
app.use(express.static("public"));
app.use(cookieParser());

//morgan middleware for logging http requests in console for development environment only.
app.use(morganMiddleware);

//routes declaration
app.use("/api/v1", indexRouter);

// common error handling middleware
app.use(errorHandler);

export { httpServer };