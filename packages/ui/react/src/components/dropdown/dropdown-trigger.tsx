import type { JSX, MouseEvent } from "react";

import { useDropdownContext } from "./dropdown.context";
import type { DropdownTriggerProps } from "./dropdown.types";

export function DropdownTrigger(props: DropdownTriggerProps): JSX.Element {
    const { children, onClick, ...rest } = props;
    const context = useDropdownContext("Trigger");

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);

        if (event.defaultPrevented) {
            return;
        }

        context.setOpen(!context.open);
    };

    return (
        <button
            onClick={handleClick}
            disabled={context.disabled}
            aria-haspopup={"menu"}
            aria-expanded={context.open}
            {...rest}
        >
            {children}
        </button>
    );
}
