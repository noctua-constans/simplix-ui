import type { PolymorphicComponentWithoutRef } from "@types";
import type { ElementType } from "react";

export type LabelProps<T extends ElementType> = PolymorphicComponentWithoutRef<T>;
