import type { GridItemProps } from "@layouts";
import { Layout } from "@layouts";
import type { CSSProperties, ElementType, JSX } from "react";

export function GridItem<T extends ElementType = "div">(props: GridItemProps<T>): JSX.Element {
    const { as, style, ...rest } = props;
    const { column, row, area, colSpan, colStart, colEnd, rowSpan, rowStart, rowEnd, ...others } = rest;
    const Tag: ElementType = as ?? "div";

    const inlineStyles: CSSProperties = {
        ...(column !== undefined && { gridColumn: column }),
        ...(colSpan !== undefined && { gridColumn: `span ${colSpan}` }),
        ...(colStart !== undefined && { gridColumnStart: colStart }),
        ...(colEnd !== undefined && { gridColumnEnd: colEnd }),

        ...(row !== undefined && { gridRow: row }),
        ...(rowSpan !== undefined && { gridRow: `span ${rowSpan}` }),
        ...(rowStart !== undefined && { gridRowStart: rowStart }),
        ...(rowEnd !== undefined && { gridRowEnd: rowEnd }),

        ...(area !== undefined && { gridArea: area }),

        ...style,
    };

    return <Layout as={Tag} style={inlineStyles} {...others} />;
}
