import { type JSX } from "react";

import { useDropdownContext } from "./dropdown.context";
import type { DropdownMenuProps } from "./dropdown.types";
import { Portal } from "../../portal";

export function DropdownMenu(props: DropdownMenuProps): JSX.Element | null {
    const { children, portal, ...rest } = props;
    const context = useDropdownContext("Menu");
    const shouldUsePortal = portal !== undefined && portal !== false;
    const portalProps = typeof portal === "object" ? { container: portal.container ?? null } : {};

    if (!context.open) {
        return null;
    }

    return (
        <Portal disabled={!shouldUsePortal} {...portalProps}>
            <div {...rest}>{children}</div>
        </Portal>
    );
}
