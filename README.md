# 🔐 Caesar Cipher — Encryption & Decryption Web App

A modern, responsive web application that encrypts and decrypts text using the classic **Caesar Cipher** algorithm. Built as a college cybersecurity / cryptography mini project to demonstrate the fundamentals of substitution ciphers.

![Status](https://img.shields.io/badge/status-ready-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 📖 Project Overview

The Caesar Cipher is one of the oldest and simplest encryption techniques — each letter in the plaintext is shifted a fixed number of positions down the alphabet. This project provides a clean, interactive interface to **encrypt** and **decrypt** messages, adjust the shift key, and understand how the algorithm works.

All processing happens **entirely in your browser** — no data is ever sent to a server.

---

## ✨ Features

- **Encrypt & Decrypt** text with a custom shift key (1–25)
- **Preserves** uppercase, lowercase, numbers, spaces, punctuation, and special characters
- **Input validation** with friendly, inline error messages
- **Dedicated result section** with clear output display
- **Copy to clipboard** with one click
- **Dark / Light mode** toggle with system preference detection and persistence
- **Smooth animations** and hover effects throughout
- **Fully responsive** — works on mobile, tablet, and desktop
- **"How Caesar Cipher Works"** section with a worked example and the math formula
- **No external dependencies** — runs offline with plain HTML, CSS, and JavaScript
- Keyboard shortcut: `Ctrl/Cmd + Enter` to encrypt

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5       | Page structure & semantics |
| CSS3        | Styling, theming, animations, responsive layout |
| JavaScript (ES6) | Caesar cipher algorithm, validation, UI logic |
| Web APIs    | Clipboard, localStorage, matchMedia |

> No frameworks, no build tools, no npm install required.

---

## 📁 Folder Structure

```
caesar-cipher/
├── index.html        # Main HTML structure
├── style.css         # All styling, themes, animations
├── script.js         # Cipher algorithm & UI logic
├── README.md         # Project documentation
└── .gitignore        # Git ignore rules
```

---

## 🚀 Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/caesar-cipher.git
   cd caesar-cipher
   ```

2. *(Optional)* If you prefer not to clone, download the ZIP and extract it.

No dependencies to install — the project is plain HTML/CSS/JS.

---

## ▶️ How to Run

### Option A — Open directly
Double-click `index.html` to open it in your default browser.

### Option B — Local server (recommended)
For the cleanest experience, serve the folder with any static server:

```bash
# Python 3
python -m http.server 8000

# or Node.js (if installed)
npx serve
```

Then visit `http://localhost:8000` in your browser.

### Using it
1. Type or paste text into the input box.
2. Set a shift key (1–25) using the number input, +/- buttons, or slider.
3. Click **Encrypt** or **Decrypt**.
4. View the result in the output section.
5. Click **Copy Output** to copy the result, or **Clear** to reset.

---

## 📸 Screenshots

> Add your screenshots here.

| Light Mode | Dark Mode |
|-----------|----------|
| ![Light Mode](./screenshots/light.png) | ![Dark Mode](./screenshots/dark.png) |

---

## 🔮 Future Enhancements

- Brute-force decryption (show all 25 possible shifts)
- Frequency analysis tool to break unknown ciphers
- File upload / download for encrypting text files
- Multiple cipher algorithms (Vigenère, ROT13, Atbash)
- History log of recent operations
- Shareable URL encoding of the message + key

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

> Built as a cryptography mini project. Educational use only — the Caesar Cipher is **not secure** for real-world encryption.
