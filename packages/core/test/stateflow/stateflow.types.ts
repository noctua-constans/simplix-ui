import type { StateEventOf, StateflowSchema } from "@/stateflow";

export type TestSchema = StateflowSchema<
    "idle" | "running" | "done",
    StateEventOf<"START"> | StateEventOf<"FINISH"> | StateEventOf<"RETRY"> | StateEventOf<"STOP">,
    {
        enabled: boolean;
        attempts: number;
    }
>;
