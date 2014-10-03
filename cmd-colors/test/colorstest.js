var colors = require('../cmd-colors'),
    red = colors.red,
    bg = colors.whiteBg;

process.stdout.write(red('Testing..').whiteBg().toString());