const express = require("express");
const PORT = process.env.PORT || 80;
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const routes = require("./routes/routes");
const mongo = require("./modules/mongoose");
const UserMiddleware = require("./middlewares/UserMiddleware");
const { createServer } = require("http");
const { Server } = require("socket.io");
const socket = require("./modules/socket");

async function server(mode) {
	const app = express();
	const httpServer = createServer(app);

	const io = new Server(httpServer);

	socket(io);

	httpServer.listen(PORT, (_) => console.log(`SERVER READY AT ${PORT}`));

	try {
		// middlewares
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		app.use(cookieParser());
		app.use("/public", express.static(path.join(__dirname, "public")));
		app.use(
			"/socket",
			express.static(
				path.join(
					__dirname,
					"..",
					"node_modules",
					"socket.io",
					"client-dist"
				)
			)
		);
		app.use(UserMiddleware);

		await mongo();

		if (mode == "DEV") {
			app.use(morgan("dev"));
		}

		// settings
		app.set("view engine", "ejs");
		app.set("views", path.join(__dirname, "views"));
	} finally {
		routes(app);
	}
}

module.exports = server;
