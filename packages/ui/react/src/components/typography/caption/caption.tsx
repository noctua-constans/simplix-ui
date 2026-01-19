import type { ElementType, JSX } from "react";

import { Text } from "../text";
import type { CaptionProps } from "./caption.types";

export function Caption<T extends ElementType = "span">(props: CaptionProps<T>): JSX.Element {
    const { as, className, ...rest } = props;
    const Tag: ElementType = as ?? "span";

    return <Text as={Tag} className={className ?? "caption"} {...rest} />;
}
