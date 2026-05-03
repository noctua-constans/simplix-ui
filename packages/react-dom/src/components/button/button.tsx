import type { ElementType, JSX } from "react";

import type { ButtonProps } from "@/components";

export function Button<T extends ElementType = "button">(props: ButtonProps<T>): JSX.Element {
    const { as, ...rest } = props;

    const Tag: ElementType = as ?? "button";

    return <Tag {...rest} />;
}
