module.exports = function (grunt) {

    var path = require("path"),
        async = require("async"),
        cttBin = path.join(__dirname, "../bin/ctt.exe");

    grunt.registerMultiTask("xdt", "XDT Transformation task", function () {
        if (process.platform !== "win32") {
            grunt.fail.fatal("Only available in Windows");
        }

        var options = this.options();
        if (!options.transform) {
            grunt.fail.fatal("You have to define a transform file in the config task");
        }

        var done = this.async(),
            commands = [],
            count = 0;

        this.files.forEach(function (file) {
            var dest = file.dest,
                isDir = file.src.length > 1;

            if (isDir) {
                grunt.file.mkdir(dest);
            }

            file.src.forEach(function (src) {
                var destination = dest;
                if (!dest) {
                    destination = src;
                }
                else if (isDir) {
                    destination = path.join(dest, path.basename(src));
                }

                commands.push([
                    'source:"' + src + '"',
                    'transform:"' + options.transform + '"',
                    'destination:"' + destination + '"',
                    "pw"
                ]);
            });
        });

        async.each(
            commands,
            function (command, callback) {
                grunt.util.spawn({
                    cmd: cttBin,
                    args: command,
                    opts: {
                        stdio: "inherit"
                    }
                },
                function (error, result, code) {
                    if (error) {
                        return callback(error);
                    }

                    grunt.log.ok("File '" + command[2] + "' created.");
                    callback();
                });
            },
            function (error) {
                if (error) {
                    grunt.fail.warn("Error during transformation: " + error);
                    return;
                }

                done();
            });
    });
};