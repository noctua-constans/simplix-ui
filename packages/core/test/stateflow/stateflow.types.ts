import type { StateEventOf } from "@/stateflow";

export type TestState = "idle" | "running" | "done";

export type TestContext = {
    enabled: boolean;
    attempts: number;
};

export type TestEvent = StateEventOf<"START"> | StateEventOf<"FINISH"> | StateEventOf<"RETRY"> | StateEventOf<"STOP">;
