import type { PolymorphicComponentWithoutRef } from "@types";
import type { ElementType } from "react";

export type CodeProps<T extends ElementType> = PolymorphicComponentWithoutRef<T>;
