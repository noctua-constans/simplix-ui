import type { JSX } from "react";

import { Text } from "../text";
import type { BlockquoteProps } from "./blockquote.types";

export function Blockquote(props: BlockquoteProps): JSX.Element {
    const { cite, className, ...rest } = props;

    return <Text as={"blockquote"} cite={cite} className={className ?? "blockquote"} {...rest} />;
}
