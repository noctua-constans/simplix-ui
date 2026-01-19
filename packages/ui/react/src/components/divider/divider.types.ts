import type { HTMLAttributes } from "react";

import type { ComponentWithStyles } from "../../types";

export type DividerProps = ComponentWithStyles & Omit<HTMLAttributes<HTMLHRElement>, keyof ComponentWithStyles>;
