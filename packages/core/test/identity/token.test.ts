import { describe, expect, it, vi } from "vitest";

import { createToken } from "@/identity";

describe("createToken", () => {
    it("creates a token with the default length", () => {
        const token = createToken();

        expect(token.get()).toHaveLength(12);
    });

    it("uses the default charset", () => {
        const token = createToken();

        expect(token.get()).toMatch(/^[A-Za-z0-9]{12}$/);
    });

    it("returns the same token after the first generation", () => {
        const token = createToken();

        const first = token.get();
        const second = token.get();

        expect(second).toBe(first);
    });

    it("creates a token with a custom length", () => {
        const token = createToken({ length: 6 });

        expect(token.get()).toHaveLength(6);
    });

    it("creates a token from a custom charset", () => {
        const token = createToken({
            length: 8,
            charset: "A",
        });

        expect(token.get()).toBe("AAAAAAAA");
    });

    it("creates a token map with the default size", () => {
        const token = createToken();

        const map = token.map();

        expect(map.size).toBe(16);
    });

    it("uses numeric indexes as default map keys", () => {
        const token = createToken({
            length: 4,
            charset: "A",
        });

        const map = token.map();

        expect([...map.keys()]).toEqual(Array.from({ length: 16 }, (_, i) => i));
    });

    it("uses a custom map size", () => {
        const token = createToken({
            length: 4,
            charset: "A",
            map: {
                size: 3,
            },
        });

        const map = token.map();

        expect(map.size).toBe(3);
        expect([...map.keys()]).toEqual([0, 1, 2]);
    });

    it("uses a custom map key mapper", () => {
        const token = createToken<string>({
            length: 4,
            charset: "A",
            map: {
                size: 3,
                key: (index) => `token-${index}`,
            },
        });

        const map = token.map();

        expect([...map.keys()]).toEqual(["token-0", "token-1", "token-2"]);
        expect(map.get("token-0")).toBe("AAAA");
    });

    it("uses provided map keys instead of generated indexes", () => {
        const keys = ["root", "trigger", "content"];
        const token = createToken<string>({
            length: 4,
            charset: "A",
            map: {
                keys,
            },
        });

        const map = token.map();

        expect(map.size).toBe(3);
        expect([...map.keys()]).toEqual(keys);

        expect(map.get("root")).toBe("AAAA");
        expect(map.get("trigger")).toBe("AAAA");
        expect(map.get("content")).toBe("AAAA");
    });

    it("returns the same map after the first generation", () => {
        const token = createToken({
            length: 4,
            charset: "A",
        });

        const first = token.map();
        const second = token.map();

        expect(second).toBe(first);
    });

    it("does not reuse the single token value for map values", () => {
        const randomSpy = vi
            .spyOn(Math, "random")
            .mockReturnValueOnce(0)
            .mockReturnValueOnce(0)
            .mockReturnValueOnce(0)
            .mockReturnValueOnce(0)
            .mockReturnValueOnce(0.99)
            .mockReturnValueOnce(0.99)
            .mockReturnValueOnce(0.99)
            .mockReturnValueOnce(0.99);

        const token = createToken({
            length: 4,
            charset: "AB",
            map: {
                size: 2,
            },
        });

        const map = token.map();

        expect(map.get(0)).toBe("AAAA");
        expect(map.get(1)).toBe("BBBB");

        randomSpy.mockRestore();
    });
});
