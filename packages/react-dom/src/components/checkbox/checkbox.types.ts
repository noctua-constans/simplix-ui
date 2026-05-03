import type { InputHTMLAttributes, Ref } from "react";

export type CheckboxProps = {
    ref?: Ref<HTMLInputElement>;
    indeterminate?: boolean;
    onCheckedChange?: (checked: boolean) => void;
} & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    | "type"
    | "placeholder"
    | "minLength"
    | "maxLength"
    | "pattern"
    | "size"
    | "min"
    | "max"
    | "step"
    | "accept"
    | "multiple"
    | "capture"
    | "selectionStart"
    | "selectionEnd"
    | "selectionDirection"
    | "src"
    | "alt"
    | "height"
    | "width"
    | "list"
    | "onRateChange"
    | "onVolumeChange"
    | "onDurationChange"
    | "onDurationChangeCapture"
    | "onRateChangeCapture"
    | "onVolumeChangeCapture"
    | "onChangeCapture"
>;
