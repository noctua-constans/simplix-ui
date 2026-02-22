import { Body, Button, Caption, Divider, Dropdown, Flex, Heading, Label, Stack, Text } from "@simplix/react";
import { useState } from "react";

export default function App() {
    const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");
    const [accent, setAccent] = useState<"teal" | "orange" | "slate">("teal");

    return (
        <main className={`page page--${accent} page--${density}`}>
            <section className="hero panel">
                <Caption as="p" className="kicker">
                    Workspace playground
                </Caption>
                <Heading variant="h1" className="hero-title">
                    Simplix React Playground
                </Heading>
                <Body className="hero-copy">
                    Локальная песочница для проверки типографики, layout-примитивов и базовых компонентов без шаблонного
                    Vite-мусора.
                </Body>
                <Flex className="toolbar" wrap="wrap" alignItems="center">
                    <Label as="span">Accent</Label>
                    <div className="button-row" role="group" aria-label="Choose accent">
                        <Button onClick={() => setAccent("teal")} aria-pressed={accent === "teal"}>
                            Teal
                        </Button>
                        <Button onClick={() => setAccent("orange")} aria-pressed={accent === "orange"}>
                            Orange
                        </Button>
                        <Button onClick={() => setAccent("slate")} aria-pressed={accent === "slate"}>
                            Slate
                        </Button>
                    </div>
                    <Label as="span">Density</Label>
                    <div className="button-row" role="group" aria-label="Choose density">
                        <Button onClick={() => setDensity("comfortable")} aria-pressed={density === "comfortable"}>
                            Comfortable
                        </Button>
                        <Button onClick={() => setDensity("compact")} aria-pressed={density === "compact"}>
                            Compact
                        </Button>
                    </div>
                </Flex>
            </section>

            <Stack className="panel showcase" direction="vertical">
                <Heading variant="h2">Typography preview</Heading>
                <Body>
                    Body text keeps readable rhythm. <Text as="span">Inline text works as well.</Text>
                </Body>
                <Divider />
                <Heading variant="h3">Buttons</Heading>
                <Flex className="button-row" wrap="wrap">
                    <Button>Primary action</Button>
                    <Button disabled>Disabled action</Button>
                </Flex>
            </Stack>

            <Stack className="panel showcase" direction="vertical">
                <Heading variant="h3">Dropdown (Radix style API)</Heading>
                <Body>
                    Компаунд-API: <code>{`<Dropdown><Dropdown.Trigger /><Dropdown.Menu /></Dropdown>`}</code>
                </Body>
                <Flex className="button-row" wrap="wrap">
                    <Dropdown>
                        <div className="dropdown-shell">
                            <Dropdown.Trigger className="button dropdown-trigger">Actions</Dropdown.Trigger>
                            <Dropdown.Menu className="dropdown-menu">
                                <Dropdown.Item className="dropdown-item">Open file</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item">Duplicate</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" disabled>
                                    Archive (disabled)
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </div>
                    </Dropdown>

                    <Dropdown disabled>
                        <div className="dropdown-shell">
                            <Dropdown.Trigger className="button dropdown-trigger">Disabled</Dropdown.Trigger>
                            <Dropdown.Menu className="dropdown-menu">
                                <Dropdown.Item className="dropdown-item">Won't open</Dropdown.Item>
                            </Dropdown.Menu>
                        </div>
                    </Dropdown>
                </Flex>
            </Stack>
        </main>
    );
}
