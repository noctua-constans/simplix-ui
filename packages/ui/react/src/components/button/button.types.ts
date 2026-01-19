import type { ComponentWithChildren, ComponentWithStyles } from "@types";
import type { ButtonHTMLAttributes } from "react";

export type ButtonProps = ComponentWithChildren &
    ComponentWithStyles &
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ComponentWithChildren | keyof ComponentWithStyles>;
