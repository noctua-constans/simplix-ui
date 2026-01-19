import type { CSSProperties, ElementType } from "react";

import type { PolymorphicComponentWithRef } from "../../types";
import type { LayoutProps } from "../layout";

export type GridRootProps<T extends ElementType> = PolymorphicComponentWithRef<
    T,
    LayoutProps<T> & {
        inline?: boolean;
        columns?: CSSProperties["gridTemplateColumns"];
        rows?: CSSProperties["gridTemplateRows"];
        areas?: CSSProperties["gridTemplateAreas"];

        gap?: CSSProperties["gap"];
        columnGap?: CSSProperties["columnGap"];
        rowGap?: CSSProperties["rowGap"];

        alignContent?: CSSProperties["alignContent"];
        justifyContent?: CSSProperties["justifyContent"];

        alignItems?: CSSProperties["alignItems"];
        justifyItems?: CSSProperties["justifyItems"];

        autoColumns?: CSSProperties["gridAutoColumns"];
        autoRows?: CSSProperties["gridAutoRows"];
        autoFlow?: CSSProperties["gridAutoFlow"];
    }
>;

export type GridItemProps<T extends ElementType> = PolymorphicComponentWithRef<
    T,
    LayoutProps<T> & {
        column?: CSSProperties["gridColumn"];
        row?: CSSProperties["gridRow"];
        area?: CSSProperties["gridArea"];

        colSpan?: number;
        colStart?: number;
        colEnd?: number;

        rowSpan?: number;
        rowStart?: number;
        rowEnd?: number;
    }
>;
