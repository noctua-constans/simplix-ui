import type { CSSProperties, ElementType } from "react";

import type { PolymorphicComponentWithRef } from "../../types";
import type { LayoutProps } from "../layout";

export type FlexProps<T extends ElementType> = PolymorphicComponentWithRef<
    T,
    LayoutProps<T> & {
        inline?: boolean;
        direction?: CSSProperties["flexDirection"];
        alignItems?: CSSProperties["alignItems"];
        justifyContent?: CSSProperties["justifyContent"];
        wrap?: CSSProperties["flexWrap"];
    }
>;
