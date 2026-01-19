import type { CSSProperties, ElementType, JSX } from "react";

import type { LayoutProps } from "./layout.types";

export function Layout<T extends ElementType = "div">(props: LayoutProps<T>): JSX.Element {
    const { as, children, className, style, ...rest } = props;
    const {
        width,
        height,
        minWidth,
        minHeight,
        maxWidth,
        maxHeight,

        margin,
        padding,

        gap,
        columnGap,
        rowGap,

        position,
        top,
        left,
        right,
        bottom,
        inset,

        overflow,
        overflowX,
        overflowY,

        zIndex,
        ...others
    } = rest;
    const Component: ElementType = as ?? "div";

    const inlineStyles = {
        ...(width !== undefined && { width }),
        ...(width !== undefined && { width }),
        ...(height !== undefined && { height }),
        ...(minWidth !== undefined && { minWidth }),
        ...(minHeight !== undefined && { minHeight }),
        ...(maxWidth !== undefined && { maxWidth }),
        ...(maxHeight !== undefined && { maxHeight }),

        ...(margin !== undefined && { margin }),
        ...(padding !== undefined && { padding }),

        ...(gap !== undefined && { gap }),
        ...(columnGap !== undefined && { columnGap }),
        ...(rowGap !== undefined && { rowGap }),

        ...(position !== undefined && { position }),
        ...(top !== undefined && { top }),
        ...(left !== undefined && { left }),
        ...(right !== undefined && { right }),
        ...(bottom !== undefined && { bottom }),
        ...(inset !== undefined && { inset }),

        ...(overflow !== undefined && { overflow }),
        ...(overflowX !== undefined && { overflowX }),
        ...(overflowY !== undefined && { overflowY }),

        ...(zIndex !== undefined && { zIndex }),

        ...style,
    } as CSSProperties;

    return (
        <Component className={className} style={inlineStyles} {...others}>
            {children}
        </Component>
    );
}
