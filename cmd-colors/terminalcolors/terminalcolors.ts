/// <reference path="../_references.ts" />

var escape = '\033[';

var reset = escape + '0m';

var styleCodes = {
    bold: escape + '1m',
    italic: escape + '3m'
};

String.prototype.cmdForegroundStyle = function (color: BaseColors, intensity: Intensity, style?: Array<Style>): string {
    var v: string = this,
        code = color + intensity,
        bold = false,
        italic = false;

    if (style && style.length > 0) {
        for (var i = 0; i < style.length; i++) {
            if (style[i] === 2) {
                bold = true;
            } else if (style[i] === 4) {
                italic = true;
            }
        }
    }

    return (bold ? styleCodes.bold : '') + (italic ? styleCodes.italic : '') + escape + code + 'm' + v + reset;
};

String.prototype.cmdBackgroundStyle = function (color: BaseColors, intensity: Intensity): string {
    var v: string = this,
        code = 10 + color + intensity;

    return escape + code + 'm' + v + reset;
};

String.prototype.cmdTextStyle = function (style: Style): string {
    var v: string = this;

    if (style && style === Style.bold) {
        return styleCodes.bold + v + reset;
    } else if (style && style === Style.italic) {
        return styleCodes.italic + v + reset;
    } else {
        return v;
    }
};
