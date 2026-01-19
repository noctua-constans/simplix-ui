import type { AccordionController, AccordionControllerOptions } from "@simplix/headless";
import { createAccordionController } from "@simplix/headless";
import { useEffect, useMemo, useSyncExternalStore } from "react";

export function useAccordionController(options: AccordionControllerOptions): AccordionController {
    const controller = useMemo(() => createAccordionController(options), []);

    useSyncExternalStore(
        controller.subscribe.bind(controller),
        controller.get.bind(controller),
        controller.get.bind(controller),
    );

    useEffect(() => {
        controller.configure({
            ...(options.onChange !== undefined && { onChange: options.onChange }),
            ...(options.equals !== undefined && { equals: options.equals }),
        });
    }, [controller, options.equals, options.onChange]);

    useEffect(() => {
        if ("value" in options) {
            controller.sync(options.value);
        }
    }, [controller, "value" in options ? options.value : undefined]);

    return controller;
}
