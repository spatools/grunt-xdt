module.exports = function (grunt) {

    var path = require('path');
    var cttBin = "../bin/ctt.exe";

    grunt.registerMultiTask('xdt', 'XDT Transformation task', function () {
        
        if (process.platform !== 'win32') {
            grunt.fail.fatal('Only available in Windows');
        }

        var options = this.options();
        if (!options.transform) {
            grunt.fail.fatal('You have to define a transform file in the config task');
        }

        var done = this.async();
        var commands = [];
        var count = 0;
        cttBin = path.join(__dirname, cttBin);
        
        this.files.forEach(function (file) {
            var dest = file.dest;
            
            file.src.forEach(function (src) {
                var args = [
                    'source:"' + src + '"',
                    'transform:"' + options.transform + '"',
                    'destination:"' + (dest || src) + '"',
                    'pw'
                ];
                commands.push(args);
            });
        });

        commands.forEach(function (command) {
            grunt.util.spawn({
                cmd: cttBin,
                args: command,
                opts: {
                    stdio: 'inherit'
                }
            },
            function (error, result, code) {
                if (error) {
                    grunt.fail.warn("Error during transformation");
                }
                grunt.log.writeln('File "' + command[2] + '" created.');

                if (++count === commands.length) {
                    done();
                }
            });
        });
    });
};