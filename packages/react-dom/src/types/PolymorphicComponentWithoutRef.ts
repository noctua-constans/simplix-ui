import type { ComponentPropsWithoutRef, ElementType } from "react";

import type { ComponentWithChildren } from "./ComponentWithChildren";
import type { ComponentWithStyles } from "./ComponentWithStyles";
import type { MergeProps } from "./MergeProps";

export type PolymorphicComponentWithoutRef<T extends ElementType, P = object> = MergeProps<
    {
        as?: T;
    } & P &
        ComponentWithStyles &
        ComponentWithChildren,
    ComponentPropsWithoutRef<T>
>;
