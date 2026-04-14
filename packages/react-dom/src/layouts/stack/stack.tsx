import type { ElementType, JSX } from "react";

import { type StackProps, Flex } from "@/layouts";

export function Stack<T extends ElementType = "div">(props: StackProps<T>): JSX.Element {
    const { as, direction = "vertical", ...rest } = props;
    const Tag: ElementType = as ?? "div";

    return <Flex as={Tag} direction={direction === "vertical" ? "column" : "row"} {...rest} />;
}
