import { type ChangeEvent, type JSX, useCallback, useEffect, useRef } from "react";

import { useCheckboxAdapter } from "../../adapters";

import type { CheckboxProps } from "@/components";

export function Checkbox(props: CheckboxProps): JSX.Element {
    const { ref, defaultChecked, disabled, indeterminate, onCheckedChange, onChange, ...rest } = props;
    const {
        "data-scope": dataScope,
        "data-slot": dataSlot,
        "data-state": dataState,
        "data-theme": dataTheme,
        "data-variant": dataVariant,
        "data-id": dataId,
    } = rest;

    const innerRef = useRef<HTMLInputElement | null>(null);
    const { controller, snapshot } = useCheckboxAdapter({
        defaultChecked,
        disabled,
        indeterminate,
    });

    useEffect(() => {
        if (innerRef.current) {
            innerRef.current.indeterminate = snapshot.indeterminate;
        }
    }, [snapshot.indeterminate]);

    const setRef = useCallback(
        (node: HTMLInputElement | null) => {
            innerRef.current = node;

            if (typeof ref === "function") {
                ref(node);
                return;
            }

            if (ref) {
                ref.current = node;
            }
        },
        [ref],
    );

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const changed = controller.toggle();

            if (changed) {
                onCheckedChange?.(controller.get().checked);
            }

            onChange?.(event);
        },
        [controller, onCheckedChange, onChange],
    );

    return (
        <input
            {...rest}
            ref={setRef}
            type="checkbox"
            checked={snapshot.checked}
            disabled={snapshot.disabled}
            aria-checked={snapshot.indeterminate ? "mixed" : snapshot.checked}
            data-scope={dataScope ?? "checkbox"}
            data-slot={dataSlot ?? "input"}
            data-state={
                dataState ?? (snapshot.indeterminate ? "indeterminate" : snapshot.checked ? "checked" : "unchecked")
            }
            data-theme={dataTheme}
            data-variant={dataVariant}
            data-id={dataId}
            onChange={handleChange}
        />
    );
}
