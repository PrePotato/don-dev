/** Rotating circular text badge — reinforces the freelance angle.
    Inspired by the rotating-text-around-a-circle motif in the video. */
export default function AvailableBadge({ onClick }) {
  return (
    <button className="avail-badge" onClick={onClick} data-hover aria-label="Available for freelance — get in touch">
      <svg className="avail-badge__ring" viewBox="0 0 140 140">
        <defs>
          <path id="availCircle" d="M70,70 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0" />
        </defs>
        <text>
          <textPath href="#availCircle" startOffset="0">
            AVAILABLE FOR FREELANCE • OPEN TO COLLABS •&nbsp;
          </textPath>
        </text>
      </svg>
      <span className="avail-badge__core" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
          <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  );
}
