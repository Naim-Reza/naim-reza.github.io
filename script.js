/*
 * Interactive terminal for Naim Reza's portfolio.
 *
 * This script renders a fake terminal on the page using plain HTML, CSS and
 * JavaScript.  When the page loads it prints an ASCII art banner and a
 * short biography, then waits for user input at a prompt.  Users can
 * type commands such as `help`, `bio`, `publications`, `news`, `cv` or
 * `clear` to explore different sections of the portfolio.  A simple
 * command history is maintained so that the up and down arrow keys recall
 * previous commands.
 */

document.addEventListener('DOMContentLoaded', () => {
  const terminal = document.getElementById('terminal');
  const hiddenInput = document.getElementById('hidden-input');
  const commandText = document.getElementById('command-text');

  // History of entered commands; used for navigating with arrow keys.
  const history = [];
  let historyIndex = 0;

  // ASCII art banner.  Defined as a template string for readability.
  const asciiArt = `
      _   _       _     _____           _____        
     | \ | |     | |   |  __ \         |  __ \       
     |  \\| | __ _| |_  | |__) |_ _  ___| |__) |__  ___ _ __
     | . \` |/ _\` | __| |  ___/ _\` |/ __|  ___/ _ \/ _ \ '__|
     | |\\  | (_| | |_  | |  | (_| | (__| |  |  __/  __/ |   
     |_| \_|\__,_|\__| |_|   \__,_|\___|_|   \___|\___|_|   
  `.trim().split('\n');

  // Biography describing the owner of the portfolio.
  const bio = [
    'Hello! I\'m Naim Reza, a researcher and developer passionate about biometric security and machine learning.',
    'I\'m currently a Research Assistant in the Computer Engineering department at Chosun University (Gwangju, South Korea), where I work on fingerprint anti‑spoofing and presentation attack detection.',
    'Before that I worked as a backend software engineer at Celloscope‑BD in Dhaka, Bangladesh (2020–2021).',
    'This portfolio site is presented as a terminal. Type \'.help\' to see available commands.'
  ];

  // Publications list with citations and DOI links.
  const publicationsList = [
    '• Cross‑sensor Generalization for Fingerprint Presentation Attack Detection Leveraging Local Feature Enhancement — IEEE Transactions on Biometrics, Behavior, and Identity Science (2025). <a href="https://doi.org/10.1109/TBIOM.2025.3590827" target="_blank" rel="noopener">DOI:10.1109/TBIOM.2025.3590827</a>',
    '• Localized Feature Enhancement via Patch‑Wise Learning for Fine‑Grained Image Classification — IEEE Access (2025). <a href="https://doi.org/10.1109/ACCESS.2025.3635173" target="_blank" rel="noopener">DOI:10.1109/ACCESS.2025.3635173</a>',
    '• Re‑Calibrating Network by Refining Initial Features Through Generative Gradient Regularization — IEEE Access (2025). <a href="https://doi.org/10.1109/ACCESS.2025.3534216" target="_blank" rel="noopener">DOI:10.1109/ACCESS.2025.3534216</a>',
    '• Lightweight Network for Spoof Fingerprint Detection by Attention‑Aggregated Receptive Field‑Wise Feature — Electronics 14, 1823 (2025). <a href="https://doi.org/10.3390/electronics14091823" target="_blank" rel="noopener">DOI:10.3390/electronics14091823</a>',
    '• Enhancing Ensemble Learning Using Explainable CNN for Spoof Fingerprints — Sensors 24, 187 (2024). <a href="https://doi.org/10.3390/s24010187" target="_blank" rel="noopener">DOI:10.3390/s24010187</a>'
  ];

  // News items summarising blog posts or announcements.
  const newsList = [
    '<span class="accent">Proven Strategies to Drive Growth for Your SME Business</span> (Mahfel Huq & Co., 11 Dec 2024): practical advice for small and medium‑sized enterprises — understand your market, build a strong brand, nurture customer relationships, leverage technology, manage finances wisely, diversify your offerings, empower your team, monitor key metrics, network actively and embrace sustainability.',
    '<span class="accent">2024–2025 Bangladesh individual income tax rates</span> (Mahfel Huq & Co., 10 Jun 2024): summarises proposed tax brackets — tax‑free income up to Tk 3.5 lakh, a new 30% rate for income above Tk 3.85 crore, and adjustments to lower brackets.'
  ];

  // Curriculum vitae summarising employment and interests.
  const cvLines = [
    'Research Assistant, Computer Engineering — Chosun University (Gwangju, KR), Sep 2022 – present',
    '  • Conduct research on biometric security, specifically fingerprint anti‑spoofing and presentation attack detection.',
    'Backend Software Engineer — Celloscope‑BD (Dhaka, BD), Sep 2020 – Aug 2021',
    '  • Developed and maintained backend services for financial technology products.',
    'Interests: deep learning, computer vision, biometrics, explainable AI.',
    'For more details please contact me directly.'
  ];

  /**
   * Append a single line of HTML to the terminal.  If a CSS class is
   * provided it will be applied to the created div.  After adding a new
   * line the terminal automatically scrolls to the bottom.
   *
   * @param {string} html  HTML string to append
   * @param {string} [cls] Optional CSS class name
   */
  function appendLine(html, cls) {
    const div = document.createElement('div');
    if (cls) div.className = cls;
    div.innerHTML = html;
    terminal.appendChild(div);
    terminal.scrollTop = terminal.scrollHeight;
  }

  /**
   * Append multiple lines to the terminal.
   *
   * @param {string[]} lines  Array of strings to append
   */
  function printLines(lines) {
    lines.forEach((line) => appendLine(line));
  }

  /**
   * Execute the given command by name.  If the command exists in the
   * commands object its associated handler is invoked; otherwise an
   * error message is printed.
   *
   * @param {string} cmd  Raw command input from the user
   */
  function handleCommand(cmd) {
    const name = cmd.trim().toLowerCase();
    if (!name) return;
    if (commands[name]) {
      commands[name]();
    } else {
      appendLine(`Unknown command: <span class="error">${escapeHtml(name)}</span>`);
    }
  }

  /**
   * Escape special HTML characters to prevent injection in unknown commands.
   *
   * @param {string} str  Input string
   * @returns {string} Escaped string
   */
  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Command handlers.  Each property corresponds to a command the user
  // can type at the prompt.  Feel free to add more commands here.
  const commands = {
    help() {
      appendLine('Available commands:');
      Object.keys(commands).forEach((cmd) => appendLine('  – ' + cmd));
    },
    bio() {
      printLines(bio);
    },
    publications() {
      printLines(publicationsList);
    },
    news() {
      printLines(newsList);
    },
    cv() {
      printLines(cvLines);
    },
    clear() {
      terminal.innerHTML = '';
    }
  };

  /**
   * Initialise the terminal on page load.  Prints the banner and bio,
   * then sets focus on the hidden input so that keystrokes go straight
   * to the command line.
   */
  function init() {
    printLines(asciiArt);
    appendLine('');
    printLines(bio);
    appendLine('');
    appendLine('Type <span class="accent">help</span> to see available commands.');
    hiddenInput.focus();
  }

  // Keep the hidden input focused when the user clicks anywhere on the page.
  document.body.addEventListener('click', () => {
    hiddenInput.focus();
  });

  // Mirror the hidden input value to the visible command text as the user types.
  hiddenInput.addEventListener('input', () => {
    commandText.textContent = hiddenInput.value;
  });

  // Handle key presses in the hidden input.  Enter executes the command,
  // ArrowUp/ArrowDown navigate history.
  hiddenInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const value = hiddenInput.value;
      appendLine('$ ' + escapeHtml(value));
      handleCommand(value);
      if (value.trim()) {
        history.push(value);
        historyIndex = history.length;
      }
      hiddenInput.value = '';
      commandText.textContent = '';
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0) {
        historyIndex = Math.max(0, historyIndex - 1);
        hiddenInput.value = history[historyIndex] || '';
        commandText.textContent = hiddenInput.value;
      }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (history.length > 0) {
        historyIndex = Math.min(history.length, historyIndex + 1);
        if (historyIndex === history.length) {
          hiddenInput.value = '';
        } else {
          hiddenInput.value = history[historyIndex] || '';
        }
        commandText.textContent = hiddenInput.value;
      }
      e.preventDefault();
    }
  });

  // Start the terminal.
  init();
});