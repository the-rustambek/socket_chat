const mongoose = require("mongoose");
require("../models/UserModel");
require("../models/AdsModel");
require("../models/CategoryModel");
require("../models/SessionsModel");
require("../models/MessagesModel");

async function mongo() {
	try {
		await mongoose.connect(process.env.MONGO_URL);
	} catch (error) {
		console.error("MONGOERROR:", error + "");
	}
}

module.exports = mongo;
