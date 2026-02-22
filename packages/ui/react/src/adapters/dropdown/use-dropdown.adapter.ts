import { createDropdownController, type DropdownController, type DropdownControllerOptions } from "@simplix/headless";
import { useSyncExternalStore, useRef } from "react";

import type { DropdownAdapter } from "./dropdown.types";

export function useDropdownAdapter(options?: DropdownControllerOptions): DropdownAdapter {
    const ref = useRef<DropdownController | null>(null);

    if (ref.current === null) {
        ref.current = createDropdownController(options);
    }

    const controller = ref.current;
    const snapshot = useSyncExternalStore(
        (listener) => controller.subscribe(listener),
        () => controller.get(),
        () => controller.get(),
    );

    return {
        snapshot,
        controller,
    };
}
