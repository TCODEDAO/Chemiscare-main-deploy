import fs from 'fs'
import path from 'path'
import util from 'util'

const readFilePromise = util.promisify(fs.readFile)

// API client for working with GitHub data using promises
const { Octokit } = require("@octokit/rest");

const token = process.env["GITHUB_TOKEN"];
console.log(token)
if (token == null) {
    console.error("Expected GITHUB_TOKEN environment variable to create repository. Exiting...")
    process.exit(-1)
}

async function run() {
    const octokit = new Octokit({
        auth: token,
        log: console,
    });

    // change these values to create the test repository under your account
    const owner = "shiftkey";
    const repo = "upload-an-image-test-repo";

    await octokit.repos.createForAuthenticatedUser({
        name: repo,
        description: "testing uploading an image through the GitHub API",
    })

    // ensure that you are reading the file from disk as binary before converting
    // to base64
    const imagePath = path.join(__dirname, 'example.png')
    const bytes = await readFilePromise(imagePath, 'binary')
    const buffer = Buffer.from(bytes, 'binary')
    const content = buffer.toString('base64')

    // TODO: updating file requires providing the SHA of existing blob
    //       this is not currently supported
    const result = await octokit.repos.createOrUpdateFile({
        owner,
        repo,
        message: "Adding an image to the repository",
        path: 'example.png',
        content,
    })

    console.log(`Created commit at ${result.data.commit.html_url}`)
}

run()
    .catch(err => {
        console.error(err, err.stack)
    })