import type { PolymorphicComponentWithoutRef } from "@types";
import type { ElementType } from "react";

export type BodySize = "small" | "medium" | "large";
export type BodyProps<T extends ElementType> = PolymorphicComponentWithoutRef<
    T,
    {
        size?: BodySize | undefined;
    }
>;
