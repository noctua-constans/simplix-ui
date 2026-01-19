import type { ElementType, JSX } from "react";

import { Text } from "../text";
import type { BodyProps, BodySize } from "./body.types";

export function Body<T extends ElementType = "p">(props: BodyProps<T>): JSX.Element {
    const { size, as, className, ...rest } = props;
    const Tag: ElementType = as ?? "p";
    const Size: BodySize = size ?? "medium";

    return <Text as={Tag} className={className ?? `body body--${Size}`} {...rest} />;
}
