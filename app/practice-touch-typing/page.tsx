"use client";
import { Suspense } from "react";
import { useTypingEngine } from "./-components/use-typing-engine";
import TypingStyles from "./-components/styles";
import Header from "./-components/header";
import StatsBar from "./-components/stats-bar";
import ProgressBar from "./-components/progress-bar";
import TextDisplay from "./-components/text-display";
import PastePanel from "./-components/paste-panel";
import FinishedOverlay from "./-components/finished-overlay";
import KeyboardShortcutsFooter from "./-components/keyboard-shortcuts-footer";

function TypingPracticeInner() {
  const engine = useTypingEngine();

  if (!engine.loaded) {
    return (
      <div
        dir="ltr"
        className="h-screen bg-background flex items-center justify-center text-muted-foreground font-mono text-base"
      >
        loading...
      </div>
    );
  }

  if (engine.sampleLoading) {
    return (
      <div
        dir="ltr"
        className="h-screen bg-background flex flex-col items-center justify-center gap-3 text-muted-foreground font-mono text-base"
      >
        <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
        <span>Loading content from &quot;{engine.sampleFrom}&quot;...</span>
      </div>
    );
  }

  return (
    <>
      <TypingStyles />

      <div
        dir="ltr"
        className="h-screen bg-background text-foreground font-[Outfit,sans-serif] flex flex-col overflow-hidden"
      >
        <Header
          sampleTitle={engine.sampleTitle}
          bestWpm={engine.bestWpm}
          sessions={engine.sessions}
          soundEnabled={engine.soundEnabled}
          isActive={engine.isActive}
          onToggleSound={() => engine.setSoundEnabled((p) => !p)}
          onRestart={engine.restart}
          onReset={engine.reset}
        />

        {engine.isActive && (
          <StatsBar
            wpm={engine.wpm}
            accuracy={engine.accuracy}
            errors={engine.errors}
            elapsed={engine.elapsed}
            typedLength={engine.typed.length}
            totalLength={engine.activeText.length}
            fmt={engine.fmt}
          />
        )}

        {engine.isActive && <ProgressBar percentage={engine.pct} />}

        {/* Main workspace */}
        <div className="flex-1 flex min-h-0">
          {/* Typing area */}
          <div
            className="flex-1 p-8 px-10 flex flex-col relative cursor-text min-h-0"
            onClick={() => engine.typingRef.current?.focus()}
          >
            {engine.isActive ? (
              <>
                <div className="text-xs uppercase tracking-[2.5px] text-muted-foreground/25 mb-4 font-semibold shrink-0 transition-colors duration-200">
                  {engine.hasStarted ? "typing..." : "start typing"}
                </div>
                <div
                  ref={engine.displayRef}
                  className="text-4xl leading-[2.2] tracking-wide flex-1 overflow-y-auto"
                  style={{
                    scrollbarWidth: "none",
                    fontFamily: "'Source Code Pro', monospace",
                  }}
                >
                  <TextDisplay activeText={engine.activeText} typed={engine.typed} />
                </div>
                <input
                  ref={engine.typingRef}
                  className="absolute opacity-0 w-0 h-0 pointer-events-none"
                  onKeyDown={engine.onKey}
                  autoFocus
                  tabIndex={0}
                />
                {!engine.hasStarted && !engine.isFinished && (
                  <div
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-muted-foreground/25 font-mono pointer-events-none"
                    style={{ animation: "hint-pulse 2s ease-in-out infinite" }}
                  >
                    click here · start typing
                  </div>
                )}

                {engine.isFinished && (
                  <FinishedOverlay
                    wpm={engine.wpm}
                    accuracy={engine.accuracy}
                    errors={engine.errors}
                    elapsed={engine.elapsed}
                    fmt={engine.fmt}
                    onRestart={engine.restart}
                    onReset={engine.reset}
                  />
                )}
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 p-12">
                <div
                  className="text-5xl opacity-10 mb-2"
                  style={{ fontFamily: "'Source Code Pro', monospace" }}
                >
                  _
                </div>
                <h2 className="text-xl font-medium text-muted-foreground">Ready to practice?</h2>
                <p className="text-muted-foreground/60 text-base text-center max-w-[360px] leading-relaxed">
                  Paste any English text on the right panel — articles, paragraphs, notes — and
                  start typing to practice.
                </p>
                <div className="text-xs text-muted-foreground/30 bg-secondary/50 px-3 py-1.5 rounded-lg border border-border/50 font-mono uppercase tracking-widest">
                  English text only · Arabic will be auto-removed
                </div>
                {engine.sampleError && (
                  <div className="text-destructive text-sm bg-destructive/10 px-4 py-2 rounded-lg mt-2">
                    {engine.sampleError}
                  </div>
                )}
                <div className="mt-6 text-sm text-muted-foreground/40 font-mono text-center leading-relaxed">
                  <span className="text-muted-foreground/60 font-semibold">Tip:</span> You can also
                  load content from IqdWiki articles by adding
                  <br />
                  <code className="bg-secondary px-2 py-1 rounded text-primary text-xs">
                    ?sample-from=article-slug
                  </code>{" "}
                  to the URL
                </div>
              </div>
            )}
          </div>

          {/* Paste panel */}
          {engine.showPaste && (
            <PastePanel
              sourceText={engine.sourceText}
              sampleError={engine.sampleError}
              onTextChange={engine.setSourceText}
              onStartPractice={engine.handleStartPractice}
            />
          )}
        </div>

        <KeyboardShortcutsFooter />
      </div>
    </>
  );
}

export default function TypingPractice() {
  return (
    <Suspense
      fallback={
        <div
          dir="ltr"
          className="h-screen bg-background flex items-center justify-center text-muted-foreground font-mono text-base"
        >
          loading...
        </div>
      }
    >
      <TypingPracticeInner />
    </Suspense>
  );
}
