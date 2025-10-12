(function () {
    'use strict';
  
    const textarea = document.getElementById('greentext-area');
    const greenBtn = document.getElementById('greentext-btn');
    const copyBtn = document.getElementById('copy-btn');
  
    textarea.value = '>';
  
    textarea.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
  
        const start = textarea.selectionStart;
        const before = textarea.value.substring(0, start);
        const after = textarea.value.substring(start);
  
        let insertText = "\n>";
        textarea.value = before + insertText + after;
  
        textarea.selectionStart = textarea.selectionEnd = start + insertText.length;
      }
    });
  
    greenBtn.addEventListener('click', () => {
      const el = textarea;
  
      const start = el.selectionStart;
      const end = el.selectionEnd;
  
      if (start === end) {
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