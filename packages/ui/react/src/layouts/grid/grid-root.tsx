import type { CSSProperties, ElementType, JSX } from "react";

import type { GridRootProps } from "./grid.types";
import { Layout } from "../layout";

export function GridRoot<T extends ElementType = "div">(props: GridRootProps<T>): JSX.Element {
    const { as, style, ...rest } = props;
    const {
        inline,
        columns,
        rows,
        areas,

        gap,
        columnGap,
        rowGap,

        alignContent,
        justifyContent,

        alignItems,
        justifyItems,

        autoColumns,
        autoRows,
        autoFlow,

        ...others
    } = rest;
    const Tag: ElementType = as ?? "div";

    const inlineStyles: CSSProperties = {
        display: inline ? "inline-grid" : "grid",
        ...(columns !== undefined && { gridTemplateColumns: columns }),
        ...(rows !== undefined && { gridTemplateRows: rows }),
        ...(areas !== undefined && { gridTemplateAreas: areas }),

        ...(gap !== undefined && { gap: gap }),
        ...(columnGap !== undefined && { columnGap: columnGap }),
        ...(rowGap !== undefined && { rowGap: rowGap }),

        ...(alignContent !== undefined && { alignContent: alignContent }),
        ...(justifyContent !== undefined && { justifyContent: justifyContent }),

        ...(alignItems !== undefined && { alignItems: alignItems }),
        ...(justifyItems !== undefined && { justifyItems: justifyItems }),

        ...(autoColumns !== undefined && { gridAutoColumns: autoColumns }),
        ...(autoRows !== undefined && { gridAutoRows: autoRows }),
        ...(autoFlow !== undefined && { gridAutoFlow: autoFlow }),

        ...style,
    };

    return <Layout as={Tag} style={inlineStyles} {...others} />;
}
