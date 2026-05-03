import type { ElementType, JSX } from "react";

import { Flex, type StackProps } from "@/layouts";

export function Stack<T extends ElementType = "div">(props: StackProps<T>): JSX.Element {
    const { as, direction = "vertical", reverse = false, ...rest } = props;
    const Tag: ElementType = as ?? "div";

    const flexDirection =
        direction === "vertical" ? (reverse ? "column-reverse" : "column") : reverse ? "row-reverse" : "row";

    return <Flex as={Tag} direction={flexDirection} {...rest} />;
}
