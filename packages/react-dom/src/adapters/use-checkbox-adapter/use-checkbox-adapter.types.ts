import type { Snapshot } from "@simplix/contracts";
import type { CheckboxController, CheckboxData } from "@simplix/headless";

export type CheckboxAdapter = { controller: CheckboxController; snapshot: Snapshot<CheckboxData> };
