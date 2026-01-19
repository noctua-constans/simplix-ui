import { createStatelessMachine, type StatelessMachine } from "@simplix/core";

import { accordionMachineTransitions } from "./accordion.machine.transitions";
import type { AccordionMachineEvent, AccordionMachineState } from "./accordion.machine.types";

export function createAccordionMachine(): StatelessMachine<AccordionMachineState, AccordionMachineEvent> {
    return createStatelessMachine({ transitions: accordionMachineTransitions });
}
