import { type JSX, useMemo, useEffect, useCallback } from "react";

import { DropdownContext } from "./dropdown.context";
import type { DropdownRootProps, DropdownContextValue } from "./dropdown.types";
import { useDropdownAdapter } from "../../adapters";

export function DropdownRoot(props: DropdownRootProps): JSX.Element {
    const { defaultOpen = false, disabled = false, children } = props;
    const adapter = useDropdownAdapter({ defaultOpen, disabled });

    useEffect(() => {
        if (disabled) {
            adapter.controller.disable();
        } else {
            adapter.controller.enable();
        }
    }, [disabled, adapter.controller]);

    const setOpen = useCallback(
        (next: boolean) => {
            if (adapter.snapshot.disabled) {
                return;
            }

            if (next) {
                adapter.controller.open();
            } else {
                adapter.controller.close();
            }
        },
        [adapter.controller, disabled],
    );

    const value: DropdownContextValue = useMemo(
        () => ({
            open: adapter.snapshot.open,
            setOpen,
            disabled: adapter.snapshot.disabled,
        }),
        [adapter.snapshot.open, adapter.snapshot.disabled, setOpen],
    );

    return <DropdownContext.Provider value={value}>{children}</DropdownContext.Provider>;
}
