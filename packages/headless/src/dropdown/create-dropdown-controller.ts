import { _DropdownControllerImpl } from "./_DropdownControllerImpl";
import type { DropdownController, DropdownControllerOptions } from "./dropdown.types";
import { DEFAULT_OPTIONS } from "./dropdown.utils";

export function createDropdownController(options?: DropdownControllerOptions): DropdownController {
    return new _DropdownControllerImpl(options ?? DEFAULT_OPTIONS);
}
