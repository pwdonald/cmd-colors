/// <reference path="_references.ts" />
require('./terminalcolors/terminalcolors');

var BaseColorsEnum = require('./terminalcolors/enums/basecolor.enum');

class CmdColors {
    constructor() {
        var enumKeys = [];
        Object.keys(BaseColorsEnum).forEach((v) => {
            if (isNaN(parseInt(v, 10))) {
                enumKeys.push(v);
            }
        });

        // build normal colors 
        for (var i = 0; i < enumKeys.length; i++) {
            var enumName: string = enumKeys[i],
                color = BaseColorsEnum[enumName];

            var base = this[enumName] = function (c: number, value?: string) {
                if (value) {
                    return value.cmdForegroundStyle(c, Intensity.normal, []);
                }
            };

            
            this[enumName] = base.bind(this, color);

            // build bright colors 
            var bright = this[enumName + 'Bright'] = (c: number, value?: string) => {
                if (value) {
                    return value.cmdForegroundStyle(c, Intensity.high, []);
                }
            };

            
            this[enumName + 'Bright'] = bright.bind(null, color);

            // build background colors
            var bg = this[enumName + 'Bg'] = (c: number, value?: string) => {
                if (value) {
                    return value.cmdBackgroundStyle(c, Intensity.normal);
                }
            };

            this[enumName + 'Bg'] = bg.bind(null, color);

            // build bright background colors
            var brightBg = this[enumName + 'BgBright'] = (c: number, value?: string) => {
                if (value) {
                    return value.cmdBackgroundStyle.call(c, Intensity.high);
                }
            };

            this[enumName + 'BgBright'] = brightBg.bind(null, color);
        }
    }

}


module.exports = function() {
    return new CmdColors();
}();

