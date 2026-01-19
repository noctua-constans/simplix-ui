import type { JSX } from "react";

import type { DividerProps } from "./divider.types";

export function Divider(props: DividerProps): JSX.Element {
    const { className, style, ...rest } = props;

    return <hr role={`separator`} className={className ?? "divider"} style={style} {...rest} />;
}
