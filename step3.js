//## **Step 3**
//Copy over your ***step2.js*** code to ***step3.js***.
//Add a feature where, on the command line, you can *optionally* provide an argument to output to a file 
//instead of printing to the console. The argument should look like this: `--out output-filename.txt readfile-or-url`.

const fs = require('fs');
const process = require('process');
const axios = require('axios');
const URL = require("url").URL;

const stringIsAValidUrl = (s) => {
    try {
        new URL(s);
        return true;
    } catch (err) {
        return false;
    }
};

function determinePath() {
    if (process.argv[2] == '--out') {
        let path = process.argv.pop();
        let writeOn = process.argv.pop();
        if (stringIsAValidUrl(path)) {
            webCat(path, writeOn);
        }
        else {
            cat(path, writeOn);
        }
    }
    else {
        let path = process.argv.pop();
        if (stringIsAValidUrl(path)) {
            webCat(path);
        }
        else {
            cat(path);
        }
    }
};

function cat(path, writeOn) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("Error:", err)
            process.kill(1)
        }
        else if (writeOn) {
            fs.appendFile(writeOn, data, 'utf8', err => {
                if (err) {
                    console.log("ERROR:", err)
                    process.kill(33)
                }
                console.log(`${writeOn} was modified.`)
            })
        }
        else console.log("THIS ARE THE CONTENTS FROM FILE:", data)
    })
};

function webCat(url, writeOn) {
    axios.get(url)
        .then(function (res) {
            if (writeOn) {
                fs.appendFile(writeOn, res.data, 'utf8', err => {
                    if (err) {
                        console.log("ERROR:", err)
                        process.kill(33)
                    }
                    console.log(`${writeOn} was modified.`)
                })
            }
            else console.log(res.data)
        })
};

determinePath();