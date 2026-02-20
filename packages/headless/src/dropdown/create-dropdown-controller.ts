import { _DropdownControllerImpl } from "./_DropdownControllerImpl";
import type { DropdownController } from "./dropdown.types";

export function createDropdownController(): DropdownController {
    return new _DropdownControllerImpl();
}
