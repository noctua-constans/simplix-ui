import type { PolymorphicComponentWithRef } from "@types";
import type { CSSProperties, ElementType } from "react";

export type LayoutProps<T extends ElementType> = PolymorphicComponentWithRef<
    T,
    {
        width?: CSSProperties["width"];
        height?: CSSProperties["height"];
        minWidth?: CSSProperties["minWidth"];
        minHeight?: CSSProperties["minHeight"];
        maxWidth?: CSSProperties["maxWidth"];
        maxHeight?: CSSProperties["maxHeight"];

        margin?: CSSProperties["margin"];
        padding?: CSSProperties["padding"];

        gap?: CSSProperties["gap"];
        columnGap?: CSSProperties["columnGap"];
        rowGap?: CSSProperties["rowGap"];

        position?: CSSProperties["position"];
        top?: CSSProperties["top"];
        left?: CSSProperties["left"];
        right?: CSSProperties["right"];
        bottom?: CSSProperties["bottom"];
        inset?: CSSProperties["inset"];

        overflow?: CSSProperties["overflow"];
        overflowX?: CSSProperties["overflowX"];
        overflowY?: CSSProperties["overflowY"];

        zIndex?: CSSProperties["zIndex"];
    }
>;
