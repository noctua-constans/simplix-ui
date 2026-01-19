import type { ComponentPropsWithoutRef, ElementType } from "react";

import type { ComponentWithChildren } from "./ComponentWithChildren";
import type { ComponentWithStyles } from "./ComponentWithStyles";

export type PolymorphicComponentWithoutRef<T extends ElementType, P = object> = {
    as?: T;
} & P &
    ComponentWithStyles &
    ComponentWithChildren &
    Omit<ComponentPropsWithoutRef<T>, keyof ComponentWithStyles | keyof ComponentWithChildren | keyof P | "as">;
