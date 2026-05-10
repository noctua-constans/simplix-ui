import { type CheckboxController, type CheckboxControllerOptions, createCheckboxController } from "@simplix/headless";
import { useEffect, useRef, useSyncExternalStore } from "react";

import type { CheckboxAdapter } from "./use-checkbox-adapter.types";

export function useCheckboxAdapter(options?: CheckboxControllerOptions): CheckboxAdapter {
    const { disabled, indeterminate } = options ?? {};

    const controllerRef = useRef<CheckboxController | null>(null);

    if (!controllerRef.current) {
        controllerRef.current = createCheckboxController(options);
    }

    const controller = controllerRef.current;

    const snapshot = useSyncExternalStore(
        (listener) => controller.subscribe(() => listener()),
        () => controller.get(),
        () => controller.get(),
    );

    useEffect(() => {
        if (disabled) {
            controller.disable();
            return;
        }

        controller.enable();
    }, [controller, disabled]);

    useEffect(() => {
        controller.setIndeterminate(indeterminate);
    }, [controller, indeterminate]);

    return { controller, snapshot };
}
