//## **Step 2**

// Copy over your ***step1.js*** code to ***step2.js***

// Add a new function, ***webCat***. 
//This should take a URL and, using [axios](https://github.com/axios/axios#installing), 
//should read the content of that URL and print it to the console.
// Modify the code that invoked ***cat*** so that, based on the command-line args, 
//it decides whether the argument is a file path or a URL and calls either ***cat*** or ***webCat***, respectively.

const fs = require('fs');
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
    let path = process.argv.pop();
    if (stringIsAValidUrl(path)) {
        webCat(path);
    }
    else {
        cat(path);
    }
};

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("Error:", err)
            process.kill(1)
        }
        console.log("THIS ARE THE CONTENTS FROM FILE:", data)
    })
};

function webCat(url) {
    axios.get(url)
        .then(function (res) {
            console.log(res.data)
        })
};

determinePath();