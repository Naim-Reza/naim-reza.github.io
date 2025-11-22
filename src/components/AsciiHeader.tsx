import React from 'react';
import { motion } from 'framer-motion';

const art = `
 _   _       _            ______              
| \\ | |     (_)           | ___ \\             
|  \\| | __ _ _ _ __ ___   | |_/ /___ ______ _ 
| . \` |/ _\` | | '_ \` _ \\  |    // _ \\_  / _\` |
| |\\  | (_| | | | | | | | | |\\ \\  __// / (_| |
\\_| \\_/\\__,_|_|_|_| |_| |_| \\_| \\_\\___/___\\__,_|
`;

export default function AsciiHeader() {
    return (
        <div className="mb-8 font-mono text-tokyo-blue leading-none select-none overflow-x-auto">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="whitespace-pre"
            >
                {art}
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-4 text-tokyo-fg text-base md:text-lg"
            >
                Welcome to my interactive portfolio.
                <br />
                Type <span className="text-tokyo-cyan">help</span> to see available commands.
            </motion.div>
        </div>
    );
}
