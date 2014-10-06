var colors = require('../cmd-colors'),
    red = new colors().red().whiteBg,
    blue = new colors().blue().greenBg,
    green = new colors().green().whiteBg;

process.stdout.write(red('test').toString());

process.stdout.write(blue('test2').toString());

process.stdout.write(green('test3').toString());
