/**
 * @author HumbleHominid (Michael Fryer)
 */
//-------------------
//- Module Requires -
//-------------------
<<<<<<< HEAD
// Require the necessary packages for copying files
=======
// Require the necessray packages for copying files
>>>>>>> a3240cabe7ea46ec0f574c4a78cdecede2516964
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
<<<<<<< HEAD
const PUBLIC_PATH = 'assets'; // where to look for assets and stuff
=======
const PUBLIC_PATH = 'public'; // where to look for assets and stuff
>>>>>>> a3240cabe7ea46ec0f574c4a78cdecede2516964

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
//--------------
//- 'Main' End -
//--------------

//------------------------
//- Functions Below Here -
//------------------------
// Starts the building process
function build() {
    deleteDirFiles(DIST_PATH);

    // Copy index.html over
    copyToDist('index.html');

    // If public stuff exists copy it over
<<<<<<< HEAD
    if (fs.existsSync(PUBLIC_PATH)) {
        copyToDist(PUBLIC_PATH);
=======
    if (fs.existsSync('public')) {
        copyToDist('public');
>>>>>>> a3240cabe7ea46ec0f574c4a78cdecede2516964
    }

    // Compile the source stuff to dist
    compileCodeBase();
<<<<<<< HEAD

    // Copy all the dependencies to dist
    copyDependencies();
=======
>>>>>>> a3240cabe7ea46ec0f574c4a78cdecede2516964
}

// Recursively deletes all dir files synchronously
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
function copyToDist(source = '.') {
    fs.stat(source, (err, stats) => {
        if (err) throw err;

        // If path is file
        if (stats.isFile()) {
            // Copy file
            fs.copyFile(source, path.join(DIST_PATH, source), err => {
                if (err) throw err;
            });
        }
        // If path is directory recursively call yourself for each file in the
        // directory
        else if (stats.isDirectory()) {
            fs.mkdirSync(path.join(DIST_PATH, source));
<<<<<<< HEAD

            fs.readdir(source, (error, files) => {
                if (error) throw error;

=======

            fs.readdir(source, (error, files) => {
                if (error) throw error;

>>>>>>> a3240cabe7ea46ec0f574c4a78cdecede2516964
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
<<<<<<< HEAD

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

// Copy all dependencies
function copyDependencies() {
    function depHandler(data, subDir) {
        let json = JSON.parse(data);
        let distDir = path.join(DIST_PATH, 'bower_components');

        // If there are dependencies make a dir
        if (json.dependencies && Object.keys(json.dependencies).length !== 0) {
            if (!fs.existsSync(distDir)) {
                fs.mkdirSync(distDir);
            }
        }

        // For each dependency
        for (let dep in json.dependencies) {
            copyToDist(path.join('bower_components', dep));
        }
    }

    if (fs.exists('bower.json')) {
        fs.readFile('bower.json', (err, data) => {
            if (err) {
                throw err;
            }

            depHandler(data, 'bower_components');
=======

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
>>>>>>> a3240cabe7ea46ec0f574c4a78cdecede2516964
        });
    }

    if (fs.exists('package.json')) {
        fs.readFile('package.json', (err, data) => {
            if (err) {
                throw err;
            }

            depHandler(data, 'node_modules');
        });
    }
}
