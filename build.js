/**
 * @author HumbleHominid (Michael Fryer)
 */
//-------------------
//- Module Requires -
//-------------------
// Require the necessray packages for copying files
const cp = require('child_process'); // For creating processes
const fs = require('fs'); // For accessing the file system
const path = require('path'); // For making paths and stuff

// Dev package requires
const sass = require('node-sass'); // SASS compiler
const browserify = require('browserify'); // For dealing with requires
const babelify = require('babelify'); // For dealing with ES6/7 >> ES5

//----------------------
//- 'Actual' Constants -
//----------------------
// directory paths
const DIST_PATH = 'dist'; // for where to store the distribution
const PUBLIC_PATH = 'public'; // where to look for assets and stuff

//----------------
//- 'Main' Start -
//----------------
// The actual stuff being ran
if (fs.existsSync(DIST_PATH)) {
    build();
}
// Else make the directory
else {
    fs.mkdirSync(DIST_PATH);

    build();
}

//------------------------
//- Functions Below Here -
//------------------------
// Starts the building process
function build() {
    deleteDirFiles(DIST_PATH);

    // Copy index.html over
    copyToDist('index.html');

    // If public stuff exists copy it over
    if (fs.existsSync('public')) {
        copyToDist('public');
    }

    // Compile the source stuff to dist
    compileCodeBase();
}
// Recursively deletes all dir files
function deleteDirFiles(dir = '.some_dir') {
    // Get all the file names
    let files = fs.readdirSync(dir);

    // Unlink all the files
    files.forEach(file => {
        let target = path.join(dir, file);

        // If directory recursively call yourself then delete this dir
        if (fs.statSync(target).isDirectory()) {
            deleteDirFiles(target);

            fs.rmdirSync(target);
        }
        else {
            fs.unlinkSync(target);
        }
    });
}

// If dir, copy files. If file, copy file
function copyToDist(source = '.', targetDir = DIST_PATH) {
    fs.stat(source, (err, stats) => {
        if (err) throw err;

        // If path is file
        if (stats.isFile()) {
            // Copy file
            fs.copyFile(source, path.join(targetDir, source), err => {
                if (err) throw err;
            });
        }
        // If path is directory recursively call yourself for each file in the
        // directory
        else if (stats.isDirectory()) {
            fs.mkdirSync(path.join(targetDir, source));

            fs.readdir(source, (error, files) => {
                if (error) throw error;

                files.forEach(file => copyToDist(path.join(source, file)));
            });
        }
    });
}

// Put all the framework building things here
function compileCodeBase() {
    // browserify to compile the js
    browserify({ debug: true })
            .transform(babelify)
            .require('js/main.js', { entry: true })
            .bundle()
            .on('error', (err) => console.log(`Error: ${err.message}`))
            .pipe(fs.createWriteStream(`${DIST_PATH}/app.js`));

    // sass path variable
    let sassPath = `${DIST_PATH}/app.css`;

    // node-sass to complie the scss files to css
    sass.render({
        file: 'sass/main.scss',
        outFile: sassPath,
        outputStyle: 'compressed'
    }, (err, res) => {
        if (err) throw err;

        fs.writeFile(sassPath, res.css, error => {
            if (error) throw error;
        });
    });
}
