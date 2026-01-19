import type { ElementType } from "react";

import type { PolymorphicComponentWithoutRef } from "../../../types";

export type BodySize = "small" | "medium" | "large";
export type BodyProps<T extends ElementType> = PolymorphicComponentWithoutRef<
    T,
    {
        size?: BodySize | undefined;
    }
>;
