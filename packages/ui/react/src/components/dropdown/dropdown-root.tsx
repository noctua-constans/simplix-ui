import { type JSX } from "react";

import { DropdownContext } from "./dropdown.context";
import type { DropdownRootProps } from "./dropdown.types";

export function DropdownRoot(props: DropdownRootProps): JSX.Element {
    const { children } = props;

    return <DropdownContext.Provider value={null}>{children}</DropdownContext.Provider>;
}
