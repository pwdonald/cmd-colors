/// <reference path="../../_references.ts" />
interface String {
    cmdForegroundStyle(color: BaseColors,
        intensity: Intensity,
        style: Array<Style>): string;

    cmdTextStyle(style: Style): string;

    cmdBackgroundStyle(color: BaseColors,
        intensity: Intensity): string;
}
