'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CommandInputProps {
    onSubmit: (command: string) => void;
    promptLabel?: React.ReactNode;
}

export default function CommandInput({ onSubmit, promptLabel }: CommandInputProps) {
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSubmit(input);
            setInput('');
        }
    };

    return (
        <div className="flex items-center w-full">
            {promptLabel || (
                <>
                    <span className="text-tokyo-green mr-2">➜</span>
                    <span className="text-tokyo-blue mr-2">~</span>
                </>
            )}
            <div className="relative flex-1 flex items-center">
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="absolute opacity-0 w-full h-full cursor-default"
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                />
                <span className="whitespace-pre-wrap break-all">{input}</span>
                <span className="inline-block w-[1ch] h-[1.2em] bg-tokyo-fg animate-pulse align-middle ml-[1px]">
                    &nbsp;
                </span>
            </div>
        </div>
    );
}
