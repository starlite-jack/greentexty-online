(function () {
    'use strict';
  
    const textarea = document.getElementById('greentext-area');
    const greenBtn = document.getElementById('greentext-btn');
    const copyBtn = document.getElementById('copy-btn');
  
    // Always start with ">" if empty
    textarea.value = '>';
  
    // Automatically insert ">" on new lines
    textarea.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
  
        const start = textarea.selectionStart;
        const before = textarea.value.substring(0, start);
        const after = textarea.value.substring(start);
  
        let insertText = "\n>";
        textarea.value = before + insertText + after;
  
        // Move caret after new ">"
        textarea.selectionStart = textarea.selectionEnd = start + insertText.length;
      }
    });
  
    // Button to turn selected lines into greentext
    greenBtn.addEventListener('click', () => {
      const el = textarea;
  
      const start = el.selectionStart;
      const end = el.selectionEnd;
  
      if (start === end) {
        // No selection — convert all lines
        el.value = el.value
          .split('\n')
          .map(line => line.startsWith('>') ? line : '>' + line)
          .join('\n');
        return;
      }
  
      const selected = el.value.substring(start, end);
      const greentext = selected
        .split('\n')
        .map(line => line.startsWith('>') ? line : '>' + line)
        .join('\n');
  
      el.setRangeText(greentext, start, end, 'select');
    });
  
    // Button to copy all text
    copyBtn.addEventListener('click', () => {
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length); // mobile support
      navigator.clipboard.writeText(textarea.value)
        .then(() => {
          copyBtn.textContent = "✅ Copied!";
          setTimeout(() => copyBtn.textContent = "📋 Copy All", 1500);
        })
        .catch(() => {
          alert("Failed to copy text.");
        });
    });
  
  })();  