import type { JSX } from "react";

import type { ButtonProps } from "./button.types";

export function Button(props: ButtonProps): JSX.Element {
    const { children, className, style, ...rest } = props;

    return (
        <button className={className ?? "button"} style={style} {...rest}>
            {children}
        </button>
    );
}
