import { _ControlModelImpl } from "./_ControlModelImpl";
import type { ControlModel, ControlModelOptions } from "./control-model.types";

export function createControlModel<T>(options: ControlModelOptions<T>): ControlModel<T> {
    return new _ControlModelImpl(options);
}
