import type { JSX } from "react";

import type { DropdownItemProps } from "./dropdown.types";

export function DropdownItem(props: DropdownItemProps): JSX.Element {
    const { children, disabled, ...rest } = props;

    return (
        <button disabled={disabled} role={"menuitem"} {...rest}>
            {children}
        </button>
    );
}
