import type { PolymorphicComponentWithoutRef } from "@types";
import type { ElementType } from "react";

export type TextProps<T extends ElementType> = PolymorphicComponentWithoutRef<T>;
