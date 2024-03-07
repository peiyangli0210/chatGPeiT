import {Configuration, OpenAIApi} from 'openai';
import readline from 'readline';
const configuration = new Configuration({
    organization: "org-juPDbVJBTqkDI8F3nZcwhrzB",
    apiKey: "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"
});

const openai = new OpenAIApi(configuration);
// const openai = new OpenAI();
const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// > symbol
userInterface.prompt();
// after user hits ENTER
userInterface.on("line", async (input) => {
    await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role:"user", content:input}]
    }).then((result) => {
        console.log(result.data.choices[0].message.content)
        userInterface.prompt();
    }).catch((e) => console.log(e));
})
