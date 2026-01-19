import type { ElementType } from "react";

import type { PolymorphicComponentWithoutRef } from "../../../types";

export type TextProps<T extends ElementType> = PolymorphicComponentWithoutRef<T>;
