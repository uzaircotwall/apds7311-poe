import ExpressBrute from "express-brute";
import MongooseStore from "express-brute-mongoose";
import mongoose from "mongoose";

const bruteForceSchema = new mongoose.Schema({
    _id: String,
    data: {
        count: Number,
        lastRequest: Date,
        firstRequest: Date
    },
    expires: { type: Date, index: { expires: "id"}}
});

const BruteForceModel = mongoose.model("bruteforce",bruteForceSchema);

const store = new MongooseStore(BruteForceModel);

const bruteForce = new ExpressBrute(store, {
    freeRetries: 3,
    minWait: 3 * 60 * 1000, 
    maxWait: 3 * 60 * 1000, 
    fallCallback: function(req, res, next, nextValidRequestDate) {
        res.status(429).json({
            message: "Reached attemp limit, please try again later.",
            nextValidRequestDate
        });

    }
});

export default bruteForce