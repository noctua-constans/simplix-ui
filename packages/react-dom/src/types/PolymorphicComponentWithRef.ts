import type { ComponentPropsWithRef, ElementType, Ref } from "react";

import type { ElementOf, MergeProps } from "@/types";

export type PolymorphicComponentWithRef<T extends ElementType, P> = MergeProps<
    {
        as?: T;
        ref?: Ref<ElementOf<T>>;
    } & P,
    ComponentPropsWithRef<T>
>;
