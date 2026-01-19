import type { ElementType, JSX } from "react";

import { Text } from "../text";
import type { OverlineProps } from "./overline.types";

export function Overline<T extends ElementType = "span">(props: OverlineProps<T>): JSX.Element {
    const { as, className, ...rest } = props;
    const Tag: ElementType = as ?? "span";

    return <Text as={Tag} className={className ?? "overline"} {...rest} />;
}
