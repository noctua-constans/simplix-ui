import { DropdownItem } from "./dropdown-item";
import { DropdownMenu } from "./dropdown-menu";
import { DropdownRoot } from "./dropdown-root";
import { DropdownTrigger } from "./dropdown-trigger";

export const Dropdown = Object.assign(DropdownRoot, {
    Trigger: DropdownTrigger,
    Menu: DropdownMenu,
    Item: DropdownItem,
});
