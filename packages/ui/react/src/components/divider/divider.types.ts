import type { HTMLAttributes } from "react";

import type { ComponentWithStyles, MergeProps } from "../../types";

export type DividerProps = MergeProps<ComponentWithStyles, HTMLAttributes<HTMLHRElement>>;
