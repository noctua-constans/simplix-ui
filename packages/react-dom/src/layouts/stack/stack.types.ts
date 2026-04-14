import type { ElementType } from "react";

import type { FlexProps } from "@/layouts";
import type { PolymorphicComponentWithRef } from "@/types";

export type StackDirection = "vertical" | "horizontal";

export type StackProps<T extends ElementType = "div"> = PolymorphicComponentWithRef<
    T,
    Omit<FlexProps<T>, "direction"> & {
        direction?: StackDirection;
    }
>;
