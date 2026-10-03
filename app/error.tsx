"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="panel" role="alert">
      <h2>Unable to load CricPulse</h2>
      <p className="meta-line">Please try again.</p>
      <button className="action-btn" onClick={() => reset()}>
        Retry
      </button>
    </div>
  );
}
