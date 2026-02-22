import { type JSX, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

import type { PortalProps } from "./portal.types";

export function Portal(props: PortalProps): JSX.Element | null {
    const { children, container, disabled = false } = props;
    const canUseDOM = typeof window !== "undefined" && typeof document !== "undefined";
    const [host, setHost] = useState<HTMLElement | null>(null);
    const shouldCreateHost = canUseDOM && !disabled && container == null;

    useLayoutEffect(() => {
        if (!shouldCreateHost) {
            return;
        }

        const nextHost = document.createElement("div");
        nextHost.setAttribute("data-simplix-element", "portal");
        document.body.appendChild(nextHost);
        setHost(nextHost);

        return () => {
            nextHost.remove();
            setHost((current) => (current === nextHost ? null : current));
        };
    }, [shouldCreateHost]);

    if (disabled) {
        return <>{children}</>;
    }

    if (!canUseDOM) {
        return null;
    }

    const target = container ?? host;
    if (!target) {
        return null;
    }

    return createPortal(children, target);
}
