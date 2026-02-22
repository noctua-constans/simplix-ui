import type { HTMLAttributes, ButtonHTMLAttributes } from "react";

import type { ComponentWithChildren, ComponentWithStyles, MergeProps } from "../../types";

export type DropdownContextValue = {
    open: boolean;
    setOpen: (open: boolean) => void;
    disabled: boolean;
};

export type DropdownRootProps = {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
} & ComponentWithChildren;

export type DropdownTriggerProps = MergeProps<
    ComponentWithChildren & ComponentWithStyles,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled">
>;

export type DropdownMenuProps = MergeProps<
    {
        portal?: boolean | { container?: Element | null };
    } & ComponentWithChildren &
        ComponentWithStyles,
    HTMLAttributes<HTMLDivElement>
>;

export type DropdownItemProps = MergeProps<
    {
        onChoose?: () => void;
        disabled?: boolean;
    } & ComponentWithChildren &
        ComponentWithStyles,
    ButtonHTMLAttributes<HTMLButtonElement>
>;
