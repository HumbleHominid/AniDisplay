const cp = require('child_process');
const commands= [
        // Note that I run node-sass twice. if you start in watch it only
        // compiles new changes and does not recomplie
	"node-sass sass/main.scss app.css --output-style expanded",
	"node-sass -wr sass/main.scss app.css --output-style expanded",
	"watchify js/main.js -o app.js",
	"reload -bd"
];

commands.forEach((cmd) => {
	cp.exec(cmd, (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return;
		}
		if (stdout) {
			console.log(`stdout: ${stdout}`);
		}
		if (stderr) {
			console.error(`stderr: ${stderr}`);
		}
	});
});
