import type { ComponentWithStyles } from "@types";
import type { HTMLAttributes } from "react";

export type DividerProps = ComponentWithStyles & Omit<HTMLAttributes<HTMLHRElement>, keyof ComponentWithStyles>;
