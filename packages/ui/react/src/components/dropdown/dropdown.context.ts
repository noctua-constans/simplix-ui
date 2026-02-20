import { createContext, useContext } from "react";

import type { DropdownContextValue } from "./dropdown.types";

export const DropdownContext = createContext<DropdownContextValue | null>(null);

export function useDropdownContext(component: string): DropdownContextValue {
    const ctx = useContext(DropdownContext);
    if (!ctx) {
        throw new Error(`<Dropdown.${component}> must be inside <Dropdown>`);
    }

    return ctx;
}
