const cp = require('child_process');
const commands= [
	"node-sass sass/main.scss app.css",
	"node-sass -wr sass/main.scss app.css",
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
