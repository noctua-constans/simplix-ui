import type { ControlModelCompileOptions, ControlModelRuntimeOptions } from "@simplix/core";
import type { HeadlessController } from "@types";

import type { AccordionMachineState } from "./machine";

export type AccordionState = AccordionMachineState;

export type AccordionControllerOptions = ControlModelCompileOptions<AccordionState> &
    ControlModelRuntimeOptions<AccordionState>;

export interface AccordionController extends HeadlessController<
    AccordionState,
    ControlModelRuntimeOptions<AccordionState>
> {
    open(): void;
    close(): void;
    toggle(): void;
}
