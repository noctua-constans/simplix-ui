import type { StylingDataset } from "@simplix/vanilla-dom";
import type { InputHTMLAttributes, Ref } from "react";

import type { ComponentWithStyles } from "@/types";

type NativeProps = Pick<
    InputHTMLAttributes<HTMLInputElement>,
    | "id"
    | "name"
    | "value"
    | "form"
    | "required"
    | "autoFocus"
    | "tabIndex"
    | "title"
    | "role"
    | "aria-label"
    | "aria-labelledby"
    | "aria-describedby"
    | "aria-invalid"
    | "aria-required"
    | "readOnly"
    | "onChange"
> &
    ComponentWithStyles;

export type CheckboxProps = {
    ref?: Ref<HTMLInputElement>;

    defaultChecked?: boolean;
    disabled?: boolean;
    indeterminate?: boolean;

    onCheckedChange?: (checked: boolean) => void;
} & NativeProps &
    StylingDataset;
