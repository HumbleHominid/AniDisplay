// Require the necessray packages for copying files
const cp = require('child_process');
const fs = require('fs');
const path = require('path');
const sass = require('node-sass');

// directory path
const DIST_PATH = 'dist';

function compileCodeBase() {
    // browserify to compile the js
    cp.spawn('browserify', [ 'js/main.js', '--outfile', `${DIST_PATH}/app.js`]);

    // node-sass to complie the scss files to css
    let sassPath = `${DIST_PATH}/app.css`;

    sass.render({
        file: 'sass/main.scss',
        outFile: sassPath,
        outputStyle: 'compressed'
    }, (err, res) => {
        if (err) throw err;

        fs.writeFile(sassPath, res.css, err => console.log(err));
    });
}

(async function() {
    // Clear dir if it exists
    if (fs.existsSync(DIST_PATH)) {
        let assetsPath = path.join(DIST_PATH, 'assets');
        await deleteDirFiles(DIST_PATH);

        if (fs.existsSync(assetsPath)) {
            await deleteDirFiles(assetsPath);
        }

        // Copy index.html over
        copyToDist('index.html');
        // Compile the source stuff to dist 
        compileCodeBase();
    }
    // Else make the directory
    else {
        fs.mkdirSync(DIST_PATH);
        console.log('enasiotensa');
    }
}) ();

// If dir, copy files. If file, copy file
function copyToDist(source = '.', targetDir = DIST_PATH) {
    fs.stat(source, (err, stats) => {
        // If path is file
        if (stats.isFile()) {
            // Copy file
            copyFile(source, targetDir);
        }
        else if (stats.isDirectory()) {
            fs.readdirSync(source, (err, files), err => {
                if (err) throw err;

                files.forEach(file => copyToDist(file));
            });
        }
    });
}

// Copy a target file to a target directory
function copyFile(source, target = '.') {
    let targetPath = path.join(target, source);

    fs.copyFile(source, targetPath, err => {
        if (err) throw err;
    });
}

function deleteDirFiles(dir = 'some_dir') {
    // Get all the file names
    return fs.readdir(dir, (err, files) => {
        if (err) throw err;

        // Unlink all the files
        files.forEach(file => {
            fs.unlink(path.join(dir, file), error => {
                if (error) throw err;
            });
        });
    });
}
