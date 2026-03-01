"use client";

/**
 * Inline styles for the typing page: cursor blink animation,
 * hint pulse, finish-in animation, and Google Fonts import.
 */
export default function TypingStyles() {
    return (
        <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');
      .typing-cursor::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 2.5px;
        background: #5ea500;
        border-radius: 2px;
        z-index: 2;
        animation: cursor-blink 1s step-end infinite;
      }
      @keyframes cursor-blink {
        0%, 100% { opacity: 1 }
        50% { opacity: 0 }
      }
      @keyframes hint-pulse {
        0%, 100% { opacity: 0.5 }
        50% { opacity: 0.2 }
      }
      @keyframes finish-in {
        from { opacity: 0; transform: scale(0.97) }
        to { opacity: 1; transform: scale(1) }
      }
    `}</style>
    );
}
