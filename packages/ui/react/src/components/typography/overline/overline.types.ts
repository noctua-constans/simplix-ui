import type { PolymorphicComponentWithoutRef } from "@types";
import type { ElementType } from "react";

export type OverlineProps<T extends ElementType> = PolymorphicComponentWithoutRef<T>;
