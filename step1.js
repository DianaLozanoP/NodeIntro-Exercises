// ## **Step 1**

// In ***step1.js***, write a function, ***cat***.
// It should take one argument, ***path***, and it should read the file with that path, and print the contents of that file.
// Then, write some code that calls that function, allowing you to specify the path argument via the command line. 

const fs = require('fs');
const process = require('process');

function cat() {
    let path = process.argv.pop()
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("Error:", err)
            process.kill(1)
        }
        console.log("THIS ARE THE CONTENTS FROM FILE:", data)
    })
}
cat()
