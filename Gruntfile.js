module.exports = function (grunt) {
    var files = [
        './cmd-colors/**/*.ts',
    ];

    grunt.initConfig({
        typescript: {
            options: {
                module: 'commonjs',
                target: 'es5'
            },
            compile: {
                src: files
            }
        },
        shell: {
            tsd: {
                command: 'node node_modules/tsd/build/cli update -so --config ./cmd-colors/tsd.json'
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-typescript');

    grunt.registerTask('default', ['shell', 'typescript']);
};
