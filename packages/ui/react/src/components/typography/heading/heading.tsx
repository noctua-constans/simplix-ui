import type { ElementType, JSX } from "react";

import { Text } from "../text";
import type { HeadingProps } from "./heading.types";

export function Heading(props: HeadingProps): JSX.Element {
    const { variant, className, ...rest } = props;
    const Tag: ElementType = variant ?? "h2";

    return <Text as={Tag} className={className ?? `heading heading-${variant}`} {...rest} />;
}
