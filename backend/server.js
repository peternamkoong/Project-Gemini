const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const journeyRoutes = express.Router();
const PORT = process.env.PORT || 8080;
const path = require("path");

let Journey = require("./journey.models");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
    "mongodb+srv://admin:admin@cluster0-dhrtd.gcp.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;

connection.once("open", function () {
    console.log("MongoDB Atlas connection established successfully");
});

journeyRoutes.route("/").get(function (req, res) {
    Journey.find(function (err, journeys) {
        if (err) {
            console.log(err);
        } else {
            res.json(journeys);
        }
    });
});

journeyRoutes.route("/:id").get(function (req, res) {
    let id = req.params.id;
    Journey.findById(id, function (err, journey) {
        res.json(journey);
    });
});

journeyRoutes.route("/add").post(function (req, res) {
    let journey = new Journey(req.body);
    journey
        .save()
        .then((journey) => {
            res.status(200).json({ journey: "journey added successfully" });
        })
        .catch((err) => {
            res.status(400).send("adding new journey failed");
        });
});

journeyRoutes.route("/update/:id").post(function (req, res) {
    Journey.findById(req.params.id, function (err, journey) {
        if (!journey) res.status(404).send("journey is not found");
        else {
            journey.name = req.body.name;
            journey.description = req.body.description;
            journey.priority = req.body.priority;
            journey.completed = req.body.completed;

            journey
                .save()
                .then((todo) => {
                    res.json("Journey Updated");
                })
                .catch((err) => {
                    res.status(400).send("Journey could not be updated");
                });
        }
    });
});

//Server static assets if in production
if (process.env.NODE_ENV === "production") {
    //Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "build", "index.html"));
    });
}

app.use("/journey", journeyRoutes);

app.listen(PORT, function () {
    console.log("Server is Running on Port: " + PORT);
});
