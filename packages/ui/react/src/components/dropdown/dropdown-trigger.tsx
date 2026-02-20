import type { JSX } from "react";

import { useDropdownContext } from "./dropdown.context";
import type { DropdownTriggerProps } from "./dropdown.types";

export function DropdownTrigger(props: DropdownTriggerProps): JSX.Element {
    const { children, ...rest } = props;
    const context = useDropdownContext("Trigger");

    return (
        <button aria-haspopup={"menu"} aria-expanded={context.open} {...rest}>
            {children}
        </button>
    );
}
