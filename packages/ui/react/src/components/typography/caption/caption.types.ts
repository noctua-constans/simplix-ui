import type { PolymorphicComponentWithoutRef } from "@types";
import type { ElementType } from "react";

export type CaptionProps<T extends ElementType> = PolymorphicComponentWithoutRef<T>;
