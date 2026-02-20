import { type JSX, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";

import type { PortalProps } from "./portal.types";

export function Portal(props: PortalProps): JSX.Element | null {
    const { children, container, disabled = false } = props;

    if (disabled) {
        return <>{children}</>;
    }

    const canUseDOM = typeof window !== "undefined" && typeof document !== "undefined";

    if (!canUseDOM) {
        return null;
    }

    const hostReference = useRef<HTMLElement | null>(null);
    const shouldCreateHost = container == null;

    useLayoutEffect(() => {
        if (!shouldCreateHost) {
            hostReference.current = null;
            return;
        }

        const host = document.createElement("div");
        host.setAttribute("data-simplix-element", "portal");
        document.body.appendChild(host);
        hostReference.current = host;

        return () => {
            hostReference.current = null;
            host.remove();
        };
    }, [shouldCreateHost]);

    const target = container ?? hostReference.current;
    if (!target) {
        return null;
    }

    return createPortal(children, target);
}
