import type { ComponentWithChildren, ComponentWithStyles } from "../../../types";

export type BlockquoteProps = {
    cite?: string | undefined;
} & ComponentWithStyles &
    ComponentWithChildren;
