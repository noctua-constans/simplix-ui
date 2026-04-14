import type { ComponentPropsWithRef, ElementType, Ref } from "react";

import type { ComponentWithChildren } from "./ComponentWithChildren";
import type { ComponentWithStyles } from "./ComponentWithStyles";
import type { ElementOf } from "./ElementOf";

export type PolymorphicComponentWithRef<T extends ElementType, P> = {
    as?: T;
    ref?: Ref<ElementOf<T>>;
} & P &
    ComponentWithChildren &
    ComponentWithStyles &
    Omit<ComponentPropsWithRef<T>, keyof ComponentWithChildren | keyof ComponentWithStyles | keyof P | "as" | "ref">;
