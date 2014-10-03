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

        for (var i = 0; i < enumKeys.length; i++) {
            var enumName: string = enumKeys[i],
                color = BaseColorsEnum[enumName],
                that = this;

            var base = this[enumName] = (c: number, value?: any) => {
                if (that.v) {
                    if (that.v.indexOf('%value%') && value) {
                        that.v = that.v.replace(/%value%/g, value.cmdForegroundStyle(c, Intensity.normal, []));
                    } else {
                        that.v = (<string>that.v).cmdForegroundStyle(c, Intensity.normal, []);
                    }
                } else if (value) {
                    that.v = (value.v ? value.v.cmdForegroundStyle(c, Intensity.normal, [])
                    : value.cmdForegroundStyle(c, Intensity.normal, []));
                } else {
                    that.v = '%value%'.cmdForegroundStyle(c, Intensity.normal, []);
                }
                return that;
            };

            
            this[enumName + 'Func'] = base.bind(this, color);
            this[enumName] = (<Function>this[enumName]).call(this[enumName], arguments[0] || null);

            //// build bright colors 
            var bright = this[enumName + 'Bright'] = (c: number, value?: any) => {
                if (that.v) {
                    if (that.v.indexOf('%value%') && value) {
                        that.v = that.v.replace(/%value%/g, value.cmdForegroundStyle(c, Intensity.high, []));
                    } else {
                        that.v = (<string>that.v).cmdForegroundStyle(c, Intensity.high, []);
                    }
                    return this;
                }
                if (value) {
                    that.v = (value.v ? value.v.cmdForegroundStyle(c, Intensity.high, [])
                    : value.cmdForegroundStyle(c, Intensity.normal, []));
                }
                return that;
            };

            
            this[enumName + 'Bright'] = bright.bind(this, color);

            // build background colors
            var bg = this[enumName + 'Bg'] = (c: number, value?: any) => {
                if (this.v) {
                    if (this.v.indexOf('%value%') > -1 && value) {
                        this.v = this.v.replace(/%value%/g, (<string>value).cmdBackgroundStyle(c, Intensity.normal));
                    } else {
                        this.v = (<string>this.v).cmdBackgroundStyle(c, Intensity.normal);
                    }
                    return this;
                }
                if (value) {
                    this.v = (value.v ? (<string>value.v).cmdBackgroundStyle(c, Intensity.normal)
                    : (<string>value).cmdBackgroundStyle(c, Intensity.normal));
                }
                return this;
            };

            this[enumName + 'Bg'] = bg.bind(this, color);

            //// build bright background colors
            var bgBright = this[enumName + 'BgBright'] = (c: number, value?: any) => {
                if (this.v) {
                    if (this.v.indexOf('%value%') > -1 && value) {
                        this.v = this.v.replace(/%value%/g, (<string>value).cmdBackgroundStyle(c, Intensity.high));
                    } else {
                        this.v = (<string>this.v).cmdBackgroundStyle(c, Intensity.high);
                    }
                    return this;
                }
                if (value) {
                    this.v = (value.v ? (<string>value.v).cmdBackgroundStyle(c, Intensity.normal)
                    : (<string>value).cmdBackgroundStyle(c, Intensity.normal));
                }
                return this;
            };

            this[enumName + 'BgBright'] = bgBright.bind(this, color);
        }
    }

    toString = function () {
        return this.v;
    };

}


module.exports = function() {
    return new CmdColors();
}();

