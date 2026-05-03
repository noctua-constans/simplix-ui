import type { ElementType } from "react";

import type { EmptyProps, PolymorphicComponentWithRef } from "@/types";

export type ButtonProps<T extends ElementType> = PolymorphicComponentWithRef<T, EmptyProps>;
