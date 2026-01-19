import type { ElementType, JSX } from "react";

import type { TextProps } from "./text.types";

export function Text<T extends ElementType = "p">(props: TextProps<T>): JSX.Element {
    const { as, children, className, style, ...rest } = props;
    const Component: ElementType = as ?? "p";

    return (
        <Component className={className ?? "text"} style={style} {...rest}>
            {children}
        </Component>
    );
}
