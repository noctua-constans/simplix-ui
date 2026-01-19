import type { PolymorphicComponentWithRef } from "@types";
import type { ElementType } from "react";

import type { FlexProps } from "../flex";

export type StackDirection = "vertical" | "horizontal";

export type StackProps<T extends ElementType = "div"> = PolymorphicComponentWithRef<
    T,
    Omit<FlexProps<T>, "direction"> & {
        direction?: StackDirection;
    }
>;
