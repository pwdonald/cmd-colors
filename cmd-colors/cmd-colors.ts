/// <reference path="_references.ts" />
require('./terminalcolors/terminalcolors');

var BaseColorsEnum = require('./terminalcolors/enums/basecolor.enum');

class CmdColors {
    v = '';
    constructor() {
        var enumKeys = [];
        this.v = '';
        Object.keys(BaseColorsEnum).forEach((v) => {
            if (isNaN(parseInt(v, 10))) {
                enumKeys.push(v);
            }
        });

        // build normal colors 

        // replace with .map

        for (var i = 0; i < enumKeys.length; i++) {
            var enumName: string = enumKeys[i],
                color = BaseColorsEnum[enumName],
                that = this;

            var base = this[enumName] = (c: number, value?: any) => {
                if (that.v) {
                    that.v = (<string>that.v).cmdForegroundStyle(c, Intensity.normal, []);
                    return this;
                }
                if (value) {
                    that.v = (value.v ? value.v.cmdForegroundStyle(c, Intensity.normal, []) : value.cmdForegroundStyle(c, Intensity.normal, []));
                }
                return that;
            };

            
            this[enumName] = base.bind(this, color);

            //// build bright colors 
            //var bright = this[enumName + 'Bright'] = (c: number, value?: string) => {
            //    if (value) {
            //        return value.cmdForegroundStyle(c, Intensity.high, []);
            //    }
            //};

            
            //this[enumName + 'Bright'] = bright.bind(null, color);

            // build background colors
            var bg = this[enumName + 'Bg'] = (c: number, value?: any) => {
                if (this.v) {
                    this.v = (<string>this.v).cmdBackgroundStyle(c, Intensity.normal);
                    return this;
                }
                if (value) {
                    this.v = (value.v ? (<string>value.v).cmdBackgroundStyle(c, Intensity.normal) : (<string>value).cmdBackgroundStyle(c, Intensity.normal));
                }
                return this;
            };

            this[enumName + 'Bg'] = bg.bind(this, color);

            //// build bright background colors
            //var brightBg = this[enumName + 'BgBright'] = (c: number, value?: string) => {
            //    if (value) {
            //        return value.cmdBackgroundStyle.call(c, Intensity.high);
            //    }
            //};

            //this[enumName + 'BgBright'] = brightBg.bind(null, color);
        }
    }

    toString = function () {
        return this.v;
    };

}


module.exports = function() {
    return new CmdColors();
}();

