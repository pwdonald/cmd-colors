/// <reference path="_references.ts" />
require('./terminalcolors/terminalcolors');

var BaseColorsEnum = require('./terminalcolors/enums/basecolor.enum');

class CmdColors {
    v = '';

    reset() {
        this.v = '';
    }

    constructor() {
        var enumKeys = [];
        this.v = null;
        Object.keys(BaseColorsEnum).forEach((v) => {
            if (isNaN(parseInt(v, 10))) {
                enumKeys.push(v);
            }
        });

        enumKeys.forEach((enumName) => {
            var c = BaseColorsEnum[enumName],
                strV: string = '';

            this[enumName] = (value?: any) => {
                if (value && value.v) {
                    strV = value.v;

                    if (strV.length > 0) {
                        this.v = strV.cmdForegroundStyle(c, Intensity.normal, []);
                    }

                    return this;
                } else if (value) {
                    strV = value;

                    if (strV.length > 0) {
                        this.v = strV.cmdForegroundStyle(c, Intensity.normal, []);
                    }

                    return this;
                } else {
                    this.v = '%value%'.cmdForegroundStyle(c, Intensity.normal, []);

                    return this;
                }
            };

            this[enumName + 'Bright'] = (value?: any) => {
                if (value && value.v) {
                    strV = value.v;

                    if (strV.length > 0) {
                        this.v = strV.cmdForegroundStyle(c, Intensity.high, []);
                    }

                    return this;
                } else if (value) {
                    strV = value;

                    if (strV.length > 0) {
                        this.v = strV.cmdForegroundStyle(c, Intensity.high, []);
                    }

                    return this;
                } else {
                    this.v = '%value%'.cmdForegroundStyle(c, Intensity.high, []);

                    return this;
                }
            };

            this[enumName + 'Bg'] = (value?: any) => {
                if (value && this.v) {
                    if (this.v.indexOf('%value%') > -1 && value) {
                        this.v = this.v.replace(/%value%/g, (<string>value).cmdBackgroundStyle(c, Intensity.normal));
                    } else {
                        this.v = (<string>value.v).cmdBackgroundStyle(c, Intensity.normal);
                    }
                } else if (value) {
                    this.v = (<string>value).cmdBackgroundStyle(c, Intensity.normal);
                }

                return this;
               
            };

            this[enumName + 'BgBright'] = (value?: any) => {
                if (value && this.v) {
                    if (this.v.indexOf('%value%') > -1 && value) {
                        this.v = this.v.replace(/%value%/g, (<string>value).cmdBackgroundStyle(c, Intensity.high));
                    } else {
                        this.v = (<string>value.v).cmdBackgroundStyle(c, Intensity.high);
                    }
                } else if (value) {
                    this.v = (<string>value).cmdBackgroundStyle(c, Intensity.high);
                }

                return this;
               
            };

        });
    }

    toString = function () {
        var toRtn = this.v.replace('%value%', '');;
        this.reset();
        return toRtn;
    };
}

export = CmdColors;

