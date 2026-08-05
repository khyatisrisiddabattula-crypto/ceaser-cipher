/* ============================================================
   Caesar Cipher — script.js
   Algorithm, validation, UI wiring, theme, copy, toast.
   No external dependencies. Runs fully offline.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Element references ---------- */
  const form = document.getElementById("cipherForm");
  const inputText = document.getElementById("inputText");
  const shiftKey = document.getElementById("shiftKey");
  const shiftSlider = document.getElementById("shiftSlider");
  const shiftUp = document.getElementById("shiftUp");
  const shiftDown = document.getElementById("shiftDown");
  const encryptBtn = document.getElementById("encryptBtn");
  const decryptBtn = document.getElementById("decryptBtn");
  const clearBtn = document.getElementById("clearBtn");
  const copyBtn = document.getElementById("copyBtn");
  const outputSection = document.getElementById("outputSection");
  const outputText = document.getElementById("outputText");
  const outputMode = document.getElementById("outputMode");
  const inputError = document.getElementById("inputError");
  const shiftError = document.getElementById("shiftError");
  const toast = document.getElementById("toast");
  const themeToggle = document.getElementById("themeToggle");

  /* ---------- Caesar Cipher core ---------- */

  /**
   * Apply a Caesar shift to a single character.
   * Letters are shifted within A–Z / a–z and wrap around.
   * Everything else (digits, spaces, punctuation, symbols) is preserved.
   * @param {string} ch - a single character
   * @param {number} shift - signed shift amount (positive = encrypt, negative = decrypt)
   * @returns {string} the transformed character
   */
  function shiftChar(ch, shift) {
    const code = ch.charCodeAt(0);

    // Uppercase A–Z (65–90)
    if (code >= 65 && code <= 90) {
      return String.fromCharCode(((code - 65 + shift) % 26 + 26) % 26 + 65);
    }
    // Lowercase a–z (97–122)
    if (code >= 97 && code <= 122) {
      return String.fromCharCode(((code - 97 + shift) % 26 + 26) % 26 + 97);
    }
    // Numbers, spaces, punctuation, special chars stay as-is
    return ch;
  }

  /**
   * Run the Caesar cipher over an entire string.
   * @param {string} text - input text
   * @param {number} key - shift key 1–25
   * @param {"encrypt"|"decrypt"} mode
   * @returns {string} transformed text
   */
  function caesarCipher(text, key, mode) {
    const shift = mode === "decrypt" ? -key : key;
    let out = "";
    for (let i = 0; i < text.length; i++) {
      out += shiftChar(text[i], shift);
    }
    return out;
  }

  /* ---------- Validation ---------- */

  /**
   * Validate inputs and surface friendly errors.
   * @returns {{text:string, key:number}|null} parsed values or null if invalid
   */
  function validate() {
    let ok = true;
    const text = inputText.value;
    const keyRaw = shiftKey.value.trim();
    const key = Number(keyRaw);

    // Text validation
    if (!text.trim()) {
      showError(inputError, inputText, "Please enter some text to process.");
      ok = false;
    } else if (text.length > 10000) {
      showError(inputError, inputText, "Text is too long (max 10,000 characters).");
      ok = false;
    } else {
      clearError(inputError, inputText);
    }

    // Shift validation
    if (keyRaw === "" || !Number.isInteger(key) || key < 1 || key > 25) {
      showError(shiftError, shiftKey, "Shift key must be a whole number from 1 to 25.");
      ok = false;
    } else {
      clearError(shiftError, shiftKey);
    }

    return ok ? { text, key } : null;
  }

  function showError(el, input, msg) {
    el.textContent = msg;
    el.hidden = false;
    input.closest(".field").classList.add("has-error");
  }
  function clearError(el, input) {
    el.hidden = true;
    el.textContent = "";
    input.closest(".field").classList.remove("has-error");
  }

  /* ---------- Run cipher ---------- */
  function run(mode) {
    const parsed = validate();
    if (!parsed) {
      showToast("Please fix the highlighted fields.", true);
      return;
    }
    const result = caesarCipher(parsed.text, parsed.key, mode);
    outputText.textContent = result;
    outputMode.textContent = mode === "encrypt" ? "Encrypted" : "Decrypted";
    outputSection.hidden = false;
    copyBtn.disabled = false;
    // Re-trigger fade-in animation
    outputSection.style.animation = "none";
    void outputSection.offsetWidth;
    outputSection.style.animation = "";
  }

  /* ---------- Toast ---------- */
  let toastTimer = null;
  function showToast(message, isError) {
    toast.textContent = message;
    toast.classList.toggle("error", !!isError);
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add("show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => { toast.hidden = true; }, 300);
    }, 2200);
  }

  /* ---------- Copy ---------- */
  async function copyOutput() {
    if (copyBtn.disabled || !outputText.textContent) return;
    try {
      await navigator.clipboard.writeText(outputText.textContent);
      showToast("Output copied to clipboard");
    } catch {
      // Fallback for older browsers / non-secure contexts
      const range = document.createRange();
      range.selectNode(outputText);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      try {
        document.execCommand("copy");
        showToast("Output copied to clipboard");
      } catch {
        showToast("Copy failed — please select and copy manually.", true);
      }
      window.getSelection().removeAllRanges();
    }
  }

  /* ---------- Clear ---------- */
  function clearAll() {
    inputText.value = "";
    outputText.textContent = "";
    outputMode.textContent = "";
    outputSection.hidden = true;
    copyBtn.disabled = true;
    clearError(inputError, inputText);
    clearError(shiftError, shiftKey);
    inputText.focus();
  }

  /* ---------- Shift sync ---------- */
  function syncShift(source) {
    let val = Number(source.value);
    if (!Number.isInteger(val)) val = 3;
    val = Math.min(25, Math.max(1, val));
    shiftKey.value = val;
    shiftSlider.value = val;
  }

  /* ---------- Theme ---------- */
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("caesar-theme", theme); } catch {}
  }
  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem("caesar-theme"); } catch {}
    if (saved === "light" || saved === "dark") {
      applyTheme(saved);
    } else {
      applyTheme(window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    }
  }

  /* ---------- Event wiring ---------- */
  form.addEventListener("submit", (e) => { e.preventDefault(); run("encrypt"); });
  encryptBtn.addEventListener("click", () => run("encrypt"));
  decryptBtn.addEventListener("click", () => run("decrypt"));
  clearBtn.addEventListener("click", clearAll);
  copyBtn.addEventListener("click", copyOutput);

  shiftKey.addEventListener("input", () => syncShift(shiftKey));
  shiftSlider.addEventListener("input", () => syncShift(shiftSlider));
  shiftUp.addEventListener("click", () => { shiftKey.value = Math.min(25, Number(shiftKey.value) + 1); syncShift(shiftKey); });
  shiftDown.addEventListener("click", () => { shiftKey.value = Math.max(1, Number(shiftKey.value) - 1); syncShift(shiftKey); });

  themeToggle.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
  });

  // Live-clear errors as the user types
  inputText.addEventListener("input", () => { if (!inputText.value.trim()) return; clearError(inputError, inputText); });

  // Keyboard: Ctrl/Cmd+Enter runs encrypt
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); run("encrypt"); }
  });

  /* ---------- Init ---------- */
  initTheme();
  syncShift(shiftKey);
})();
