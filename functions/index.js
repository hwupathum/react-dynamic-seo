const functions = require('firebase-functions');
const express = require('express');
const path = require("path")
const fs = require("fs").promises;

const app = express();

app.get("/", async (req, res) => {
    const filePath = path.resolve(__dirname, "./build", "index.html")
    try {
        let data = await fs.readFile(filePath, "utf-8");
        // change the following fields accordingly
        const { color } = req.query
        if (!color) {
            data = data
                .replace(/__TITLE__/g, "Create React App")
                .replace(/__THUMB__/g, "")
                .replace(/__DESCRIPTION__/g, "Web site created using create-react-app")
        } else {
            data = data
                .replace(/__TITLE__/g, `This is ${color} color React App`)
                .replace(/__THUMB__/g, "")
                .replace(/__DESCRIPTION__/g, `This is ${color} color description`)
        }
        // 
        res.send(data)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

app.use(express.static(path.resolve(__dirname, "./build")))

//define google cloud function name
exports.webApi = functions.https.onRequest(app);