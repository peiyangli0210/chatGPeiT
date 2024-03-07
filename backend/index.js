import {Configuration, OpenAIApi} from 'openai';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 8080;
// middleware to parse incoming requests
app.use(bodyParser.json());
// middleware: making it possible for your server to respond to requests
// from different domains without running into browser security issues
app.use(cors());

const configuration = new Configuration({
    organization: "org-juPDbVJBTqkDI8F3nZcwhrzB",
    apiKey: "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"
});

const openai = new OpenAIApi(configuration);

app.post("/", async (req, res) => {
    const {chats} = req.body;

    const result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role:"system", 
                content:"You are PewPew, you can response to all kinds of questions based on your knowledge"
            },
            ...chats,
        ],

    });

    // res.json({
    //     output: result.data.choices[0].message,
    // })
    res.send({
        output: result.data.choices[0].message,
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})