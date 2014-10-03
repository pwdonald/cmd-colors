var colors = require('../cmd-colors'),
    red = colors.red.greenBg;

process.stdout.write(red('test').toString());
