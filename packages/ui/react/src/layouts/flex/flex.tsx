import type { CSSProperties, ElementType, JSX } from "react";

import { Layout } from "../layout";
import type { FlexProps } from "./flex.types";

export function Flex<T extends ElementType = "div">(props: FlexProps<T>): JSX.Element {
    const { as, style, ...rest } = props;
    const { inline, direction, alignItems, justifyContent, wrap, ...others } = rest;
    const Tag: ElementType = as ?? "div";

    const inlineStyles: CSSProperties = {
        display: inline ? "inline-flex" : "flex",
        ...(direction !== undefined && { flexDirection: direction }),
        ...(alignItems !== undefined && { alignItems: alignItems }),
        ...(justifyContent !== undefined && { justifyContent: justifyContent }),
        ...(wrap !== undefined && { flexWrap: wrap }),

        ...style,
    };

    return <Layout as={Tag} style={inlineStyles} {...others} />;
}
