"use client";

import { useState, useEffect, useRef } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export default function LogsPage() {
    const [logs, setLogs] = useState([]);

    const [loading, setLoading] = useState(true);
    const bottomRef = useRef(null);

    // 🔄 Poll logs every 5s
    useEffect(() => {
        async function fetchLogs() {
            try {
                const res = await fetch("/api/logs");
                const data = await res.json();
                setLogs(data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch logs:", err);
            }
        }

        fetchLogs();
        const interval = setInterval(fetchLogs, 5000);
        return () => clearInterval(interval);
    }, []);

    // ⬇️ Auto-scroll to bottom when logs update
    // useEffect(() => {
    //     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    // }, [logs]);

    const normalizeMessage = (msg) => {
        if (msg instanceof Error) {
            return { error: msg.message, stack: msg.stack };
        }
        if (typeof msg === "string") return msg;
        try {
            return JSON.stringify(msg, null, 2); // pretty print objects/arrays
        } catch {
            return String(msg);
        }
    };


    const getMessageColor = (msg) => {
        const str = typeof msg === "string" ? msg : JSON.stringify(msg);

        if (str.toLowerCase().includes("error")) return "text-red-500";
        if (str.toLowerCase().includes("warn")) return "text-yellow-500";
        if (str.toLowerCase().includes("success")) return "text-green-500";
        return "text-gray-500";
    };
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">API Request Logs</h1>

            <Card className="w-full max-w-6xl mx-auto shadow-lg">
                <CardContent>
                    {loading ? (
                        <p className="text-muted-foreground">Loading logs...</p>
                    ) : logs.length === 0 ? (
                        <p className="text-muted-foreground">No logs available</p>
                    ) : (
                        <div className="max-h-[75vh] overflow-y-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[200px]">Route</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Time</TableHead>
                                        <TableHead>Logs</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {logs.map((log) => (
                                        <TableRow key={log._id}>
                                            <TableCell className="font-medium">
                                                {log.route}
                                            </TableCell>
                                            <TableCell
                                                className={
                                                    log.status === 200 ? "text-green-500" : "text-red-500"
                                                }
                                            >
                                                {log.status}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(log.createdAt).toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                <Accordion type="single" collapsible>
                                                    <AccordionItem value={`log-${log._id}`}>
                                                        <AccordionTrigger className="text-sm">
                                                            View Logs
                                                        </AccordionTrigger>
                                                        <AccordionContent>
                                                            <ul className="text-sm space-y-1">
                                                                {log.messages?.length > 0 ? (
                                                                    log.messages.map((msg, i) => (
                                                                        <li
                                                                            key={i}
                                                                            className={`bg-muted p-2 rounded-md font-mono text-xs whitespace-pre-wrap ${getMessageColor(
                                                                                msg
                                                                            )}`}
                                                                        >
                                                                            {normalizeMessage(msg)}
                                                                        </li>

                                                                    ))
                                                                ) : (
                                                                    <li className="text-muted-foreground text-xs">
                                                                        No console logs
                                                                    </li>
                                                                )}
                                                            </ul>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div ref={bottomRef} />
                        </div>
                    )}
                </CardContent>
            </Card>
        </main>
    );
}
