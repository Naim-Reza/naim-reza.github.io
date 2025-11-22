'use client';

import React, { useState, useRef, useEffect } from 'react';
import AsciiHeader from './AsciiHeader';
import CommandInput from './CommandInput';
import { fileSystem } from '@/utils/fileSystem';

type HistoryItem = {
    command: string;
    output: React.ReactNode;
};

export default function Terminal() {
    const [history, setHistory] = useState<HistoryItem[]>([
        {
            command: 'help',
            output: (
                <div className="whitespace-pre-wrap text-tokyo-fg">
                    {fileSystem['help'].content?.trim()}
                </div>
            ),
        },
    ]);
    const [inputMode, setInputMode] = useState<'command' | 'confirmation'>('command');
    const [pendingAction, setPendingAction] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const handleCommand = (cmd: string) => {
        if (inputMode === 'confirmation') {
            handleConfirmation(cmd);
            return;
        }

        const trimmedCmd = cmd.trim().toLowerCase();
        let output: React.ReactNode;

        if (trimmedCmd === '') {
            output = null;
        } else if (trimmedCmd === 'clear') {
            setHistory([]);
            return;
        } else if (trimmedCmd === 'cv') {
            const node = fileSystem['cv'];
            output = <div className="whitespace-pre-wrap text-tokyo-fg">{node.content?.trim()}</div>;
            setHistory((prev) => [...prev, { command: cmd, output }]);

            // Trigger confirmation mode
            setTimeout(() => {
                setHistory((prev) => [
                    ...prev,
                    {
                        command: '',
                        output: (
                            <div className="text-tokyo-fg">
                                Do you want to download the CV? <span className="text-tokyo-green">Yes [y]</span> / <span className="text-tokyo-red">No [n]</span>
                            </div>
                        ),
                    },
                ]);
                setInputMode('confirmation');
                setPendingAction('download_cv');
            }, 100);
            return;
        } else if (fileSystem[trimmedCmd]) {
            const node = fileSystem[trimmedCmd];
            if (node.type === 'file') {
                output = <div className="whitespace-pre-wrap text-tokyo-fg">{node.content?.trim()}</div>;
            } else {
                output = <div className="text-tokyo-red">Is a directory</div>;
            }
        } else {
            output = (
                <div className="text-tokyo-red">
                    Command not found: {trimmedCmd}. Type <span className="text-tokyo-cyan">help</span> for available commands.
                </div>
            );
        }

        setHistory((prev) => [...prev, { command: cmd, output }]);
    };

    const handleConfirmation = (input: string) => {
        const normalizedInput = input.trim().toLowerCase();

        if (pendingAction === 'download_cv') {
            if (normalizedInput === 'y' || normalizedInput === 'yes') {
                const link = document.createElement('a');
                link.href = '/cv.pdf';
                link.download = 'Naim_Reza_CV.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                setHistory((prev) => [
                    ...prev,
                    { command: input, output: <div className="text-tokyo-green">Downloading CV...</div> },
                ]);
            } else {
                setHistory((prev) => [
                    ...prev,
                    { command: input, output: <div className="text-tokyo-red">Cancelled.</div> },
                ]);
            }
        }

        setInputMode('command');
        setPendingAction(null);
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleContainerClick = () => {
        // Focus the input when clicking anywhere in the terminal
        const input = document.querySelector('input');
        input?.focus();
    };

    return (
        <div
            className="min-h-screen p-4 md:p-8 font-mono text-lg overflow-y-auto bg-tokyo-bg text-tokyo-fg selection:bg-tokyo-black selection:text-tokyo-fg"
            ref={containerRef}
            onClick={handleContainerClick}
        >
            <AsciiHeader />

            <div className="space-y-2">
                {history.map((item, index) => (
                    <div key={index}>
                        {item.command && (
                            <div className="flex items-center">
                                <span className="text-tokyo-green mr-2">➜</span>
                                <span className="text-tokyo-blue mr-2">~</span>
                                <span className="text-tokyo-fg">{item.command}</span>
                            </div>
                        )}
                        {item.output && <div className="mt-1 mb-4">{item.output}</div>}
                    </div>
                ))}
            </div>

            <CommandInput
                onSubmit={handleCommand}
                promptLabel={inputMode === 'confirmation' ? <span className="text-tokyo-yellow mr-2">?</span> : undefined}
            />
            <div ref={bottomRef} />
        </div>
    );
}
