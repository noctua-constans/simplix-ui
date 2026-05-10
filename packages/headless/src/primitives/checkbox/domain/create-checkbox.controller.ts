import { CheckboxControllerImpl } from "./checkbox-controller.impl";
import type { CheckboxController, CheckboxControllerOptions } from "./checkbox.types";

export function createCheckboxController(options?: CheckboxControllerOptions): CheckboxController {
    return new CheckboxControllerImpl(options);
}
