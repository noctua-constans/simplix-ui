import { type ChangeEvent, type JSX, useEffect, useRef } from "react";

import type { CheckboxProps } from "@/components";

export function Checkbox(props: CheckboxProps): JSX.Element {
    const { ref, onCheckedChange, onChange, indeterminate = false, ...rest } = props;
    const innerRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (innerRef.current) {
            innerRef.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);

    const setRef = (node: HTMLInputElement | null) => {
        innerRef.current = node;

        if (typeof ref === "function") {
            ref(node);
        } else if (ref) {
            ref.current = node;
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onCheckedChange?.(event.currentTarget.checked);
        onChange?.(event);
    };

    return <input ref={setRef} type="checkbox" onChange={handleChange} {...rest} />;
}
