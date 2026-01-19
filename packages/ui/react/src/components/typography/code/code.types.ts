import type { ElementType } from "react";

import type { PolymorphicComponentWithoutRef } from "../../../types";

export type CodeProps<T extends ElementType> = PolymorphicComponentWithoutRef<T>;
