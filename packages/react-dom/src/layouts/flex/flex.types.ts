import type { CSSProperties, ElementType } from "react";

import type { BoxProps } from "@/layouts";
import type { PolymorphicComponentWithRef } from "@/types";

export type FlexProps<T extends ElementType> = PolymorphicComponentWithRef<
    T,
    BoxProps<T> & {
        inline?: boolean;
        direction?: CSSProperties["flexDirection"];
        alignItems?: CSSProperties["alignItems"];
        justifyContent?: CSSProperties["justifyContent"];
        wrap?: CSSProperties["flexWrap"];
    }
>;
