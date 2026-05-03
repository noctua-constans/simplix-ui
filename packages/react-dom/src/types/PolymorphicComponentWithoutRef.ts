import type { ComponentPropsWithoutRef, ElementType } from "react";

import type { MergeProps } from "@/types";

export type PolymorphicComponentWithoutRef<T extends ElementType, P = object> = MergeProps<
    {
        as?: T;
    } & P,
    ComponentPropsWithoutRef<T>
>;
