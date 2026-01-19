import type { ElementType, JSX } from "react";

import { Text } from "../text";
import type { CodeProps } from "./code.types";

export function Code<T extends ElementType = "code">(props: CodeProps<T>): JSX.Element {
    const { as, className, ...rest } = props;
    const Tag: ElementType = as ?? "code";

    return <Text as={Tag} className={className ?? "code"} {...rest} />;
}
