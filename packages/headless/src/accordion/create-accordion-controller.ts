import { _AccordionControllerImpl } from "./_AccordionControllerImpl";
import type { AccordionController, AccordionControllerOptions } from "./accordion.types";

export function createAccordionController(options: AccordionControllerOptions): AccordionController {
    return new _AccordionControllerImpl(options);
}
