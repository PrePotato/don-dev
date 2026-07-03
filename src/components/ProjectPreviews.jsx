/* Self-contained animated SVG mockups for the real project cards.
   They inherit each card's --accent (warm) for the highlight colour. */

const wrap = { width: '100%', height: '100%', display: 'block' };

/* ---- Lüge — multiplayer bluffing card game (web) ---- */
export function LugePreview() {
  return (
    <svg viewBox="0 0 400 250" style={wrap} preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="250" fill="#140b06" />
      <ellipse cx="200" cy="135" rx="150" ry="92" fill="var(--accent)" opacity=".12" />
      <ellipse cx="200" cy="135" rx="150" ry="92" fill="none" stroke="var(--accent)" strokeOpacity=".3" />

      {/* players around the table */}
      <g fontFamily="Sora, sans-serif" fontSize="8" fill="#c9b8aa">
        <circle cx="200" cy="44" r="13" fill="#241509" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="200" y="68" textAnchor="middle">You</text>
        <circle cx="78" cy="135" r="12" fill="#1d1207" stroke="#3a2a1a" /><text x="78" y="158" textAnchor="middle">Mara</text>
        <circle cx="322" cy="135" r="12" fill="#1d1207" stroke="#3a2a1a" /><text x="322" y="158" textAnchor="middle">Jonas</text>
      </g>

      {/* centre claim + pile */}
      <rect x="160" y="104" width="80" height="26" rx="8" fill="#241509" stroke="var(--accent)" strokeOpacity=".5" />
      <text x="200" y="121" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="var(--accent)">“three Kings”</text>
      <rect x="186" y="140" width="20" height="28" rx="4" fill="#2a1a0c" transform="rotate(-12 196 154)" />
      <rect x="196" y="140" width="20" height="28" rx="4" fill="#34210f" transform="rotate(8 206 154)" />

      {/* your hand */}
      <g>
        {[-32, -16, 0, 16, 32].map((dx, i) => (
          <g key={i} transform={`translate(${200 + dx} 214) rotate(${dx * 0.5})`}>
            <rect x="-15" y="-26" width="30" height="44" rx="5" fill="#fdf6ef" />
            <text x="-9" y="-12" fontFamily="Sora" fontSize="10" fontWeight="700" fill={i % 2 ? '#ff5147' : '#241509'}>
              {['K', '7', 'A', '9', 'Q'][i]}
            </text>
            <circle cx="8" cy="10" r="3" fill={i % 2 ? '#ff5147' : '#241509'} />
          </g>
        ))}
      </g>

      <text x="24" y="32" fontFamily="Sora" fontSize="17" fontWeight="800" fill="#fdf6ef">LÜGE</text>
      <rect x="300" y="20" width="74" height="20" rx="10" fill="var(--accent)" />
      <text x="337" y="34" textAnchor="middle" fontFamily="Sora" fontSize="9" fontWeight="600" fill="#241006">Call bluff</text>
    </svg>
  );
}

/* ---- Sentinel SOC — AI security operations dashboard (web) ---- */
export function SentinelPreview() {
  return (
    <svg viewBox="0 0 400 250" style={wrap} preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="250" fill="#0f0a05" />
      {/* sidebar */}
      <rect x="0" y="0" width="38" height="250" fill="#160d07" />
      <rect x="11" y="14" width="16" height="16" rx="5" fill="var(--accent)" />
      {[46, 64, 82, 100].map((y, i) => (
        <rect key={i} x="13" y={y} width="12" height="4" rx="2" fill={i === 0 ? 'var(--accent)' : '#3a2a1a'} />
      ))}

      {/* header */}
      <text x="50" y="22" fontFamily="Sora" fontSize="12.5" fontWeight="800" fill="#fdf6ef">SENTINEL SOC</text>
      <text x="50" y="32" fontFamily="JetBrains Mono, monospace" fontSize="6" letterSpacing=".5" fill="var(--accent)">AI-POWERED SECOPS</text>
      <circle cx="356" cy="20" r="3" fill="#ffb13d"><animate attributeName="opacity" values="1;.3;1" dur="1.6s" repeatCount="indefinite" /></circle>
      <text x="382" y="23" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="6.5" fill="#8a7560">LIVE</text>

      {/* stat cards */}
      <rect x="50" y="42" width="104" height="44" rx="9" fill="#160d07" stroke="#241509" />
      <text x="60" y="59" fontFamily="Inter, sans-serif" fontSize="7" fill="#8a7560">Threats blocked</text>
      <text x="60" y="77" fontFamily="Sora" fontSize="14" fontWeight="700" fill="var(--accent)">12,480</text>
      <rect x="162" y="42" width="104" height="44" rx="9" fill="#160d07" stroke="#241509" />
      <text x="172" y="59" fontFamily="Inter, sans-serif" fontSize="7" fill="#8a7560">Active alerts</text>
      <text x="172" y="77" fontFamily="Sora" fontSize="14" fontWeight="700" fill="#ff5147">7</text>
      <rect x="274" y="42" width="108" height="44" rx="9" fill="#160d07" stroke="#241509" />
      <text x="284" y="59" fontFamily="Inter, sans-serif" fontSize="7" fill="#8a7560">Risk score</text>
      <text x="284" y="77" fontFamily="Sora" fontSize="14" fontWeight="700" fill="#ffd23f">34 / 100</text>

      {/* threat chart */}
      <rect x="50" y="94" width="198" height="140" rx="10" fill="#160d07" stroke="#241509" />
      <text x="60" y="110" fontFamily="Inter, sans-serif" fontSize="7.5" fill="#c9b8aa">Threat activity · 24h</text>
      <polygon points="60,204 82,188 104,194 126,166 148,176 170,146 192,158 214,128 236,140 236,224 60,224" fill="var(--accent)" opacity=".12" />
      <polyline points="60,204 82,188 104,194 126,166 148,176 170,146 192,158 214,128 236,140" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <animate attributeName="stroke-dasharray" values="0 480;480 0" dur="2.6s" repeatCount="indefinite" />
      </polyline>

      {/* alert feed */}
      <rect x="256" y="94" width="126" height="140" rx="10" fill="#160d07" stroke="#241509" />
      <text x="266" y="110" fontFamily="Inter, sans-serif" fontSize="7.5" fill="#c9b8aa">Live alerts</text>
      <g fontFamily="JetBrains Mono, monospace" fontSize="6.5">
        {[['CRITICAL', '#ff5147', 'Brute-force'], ['HIGH', '#ff8a3d', 'Port scan'], ['MEDIUM', '#ffd23f', 'DNS anomaly'], ['HIGH', '#ff8a3d', 'Exfil attempt']].map((a, i) => (
          <g key={i} transform={`translate(266 ${120 + i * 27})`}>
            <circle cx="4" cy="7" r="3" fill={a[1]} />
            <text x="12" y="5" fill={a[1]}>{a[0]}</text>
            <text x="12" y="15" fill="#8a7560">{a[2]}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ---- Nova — AI voice receptionist (web) ---- */
export function NovaPreview() {
  return (
    <svg viewBox="0 0 400 250" style={wrap} preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="250" fill="#140b06" />
      <text x="22" y="34" fontFamily="Sora" fontSize="16" fontWeight="800" fill="#fdf6ef">NOVA</text>
      <text x="22" y="46" fontFamily="JetBrains Mono, monospace" fontSize="6.5" letterSpacing="1" fill="#8a7560">AI VOICE RECEPTIONIST</text>

      {/* voice orb */}
      <circle cx="150" cy="126" r="56" fill="var(--accent)" opacity=".12">
        <animate attributeName="r" values="48;60;48" dur="3s" repeatCount="indefinite" />
      </circle>
      {[46, 36, 26].map((r, i) => (
        <circle key={i} cx="150" cy="126" r={r} fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity={0.5 - i * 0.12}>
          <animate attributeName="r" values={`${r};${r + 4};${r}`} dur={`${2.5 + i * 0.5}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <circle cx="150" cy="126" r="17" fill="url(#novaOrb)">
        <animate attributeName="opacity" values=".8;1;.8" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* waveform */}
      <g fill="var(--accent)">
        {[10, 18, 26, 20, 30, 22, 14, 24, 12].map((h, i) => (
          <rect key={i} x={112 + i * 9} y={196 - h / 2} width="4" height={h} rx="2">
            <animate attributeName="height" values={`${h};${h * 0.4};${h}`} dur={`${0.8 + i * 0.12}s`} repeatCount="indefinite" />
            <animate attributeName="y" values={`${196 - h / 2};${196 - h * 0.2};${196 - h / 2}`} dur={`${0.8 + i * 0.12}s`} repeatCount="indefinite" />
          </rect>
        ))}
      </g>

      {/* status */}
      <rect x="112" y="212" width="78" height="16" rx="8" fill="#1a1108" stroke="var(--accent)" strokeOpacity=".4" />
      <circle cx="122" cy="220" r="3" fill="var(--accent)"><animate attributeName="opacity" values="1;.3;1" dur="1.4s" repeatCount="indefinite" /></circle>
      <text x="130" y="223" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#c9b8aa">Listening…</text>

      {/* document generation */}
      <rect x="286" y="70" width="96" height="120" rx="10" fill="#1a1108" stroke="#3a2a1a" />
      <rect x="298" y="84" width="13" height="16" rx="2" fill="#241509" stroke="var(--accent)" strokeOpacity=".5" />
      <text x="318" y="96" fontFamily="Sora" fontSize="7.5" fill="#fdf6ef">Summary.pdf</text>
      <g fill="#3a2a1a">
        <rect x="298" y="114" width="72" height="4" rx="2" /><rect x="298" y="124" width="72" height="4" rx="2" /><rect x="298" y="134" width="54" height="4" rx="2" />
      </g>
      <rect x="298" y="114" width="30" height="4" rx="2" fill="var(--accent)">
        <animate attributeName="width" values="8;72;8" dur="3s" repeatCount="indefinite" />
      </rect>
      <text x="298" y="162" fontFamily="JetBrains Mono, monospace" fontSize="6.5" fill="var(--accent)">generating…</text>
      <rect x="298" y="170" width="72" height="10" rx="5" fill="var(--accent)" fillOpacity=".18" />

      <defs>
        <radialGradient id="novaOrb" cx="40%" cy="35%">
          <stop offset="0" stopColor="#fff7f0" /><stop offset="55%" stopColor="var(--accent)" /><stop offset="100%" stopColor="#7a2f18" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ---- Scroll Story — scroll-driven video-hero site (web) ---- */
export function ScrollPreview() {
  return (
    <svg viewBox="0 0 400 250" style={wrap} preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="250" fill="#140b06" />
      <ellipse cx="200" cy="118" rx="185" ry="112" fill="var(--accent)" opacity=".12" />

      {/* filmstrip motif */}
      <g>
        {[...Array(9)].map((_, i) => (
          <rect key={i} x={12 + i * 44} y="20" width="36" height="22" rx="3" fill="#1d1207" stroke="#3a2a1a" />
        ))}
      </g>

      {/* meta rail chips (mirrors the real site's sections) */}
      <g fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#c9b8aa">
        <rect x="14" y="58" width="50" height="16" rx="8" fill="#1a1108" stroke="#3a2a1a" /><text x="23" y="69">Design</text>
        <rect x="70" y="58" width="50" height="16" rx="8" fill="#1a1108" stroke="#3a2a1a" /><text x="79" y="69">Motion</text>
        <rect x="126" y="58" width="64" height="16" rx="8" fill="#1a1108" stroke="#3a2a1a" /><text x="135" y="69">Front-end</text>
      </g>

      {/* pinned hero */}
      <text x="200" y="126" textAnchor="middle" fontFamily="Sora" fontSize="34" fontWeight="800" fill="#fdf6ef">don.dev</text>
      <text x="200" y="148" textAnchor="middle" fontFamily="Sora" fontSize="11" fill="var(--accent)">Scroll is the playhead.</text>

      {/* scroll indicator */}
      <circle cx="384" cy="108" r="2.5" fill="var(--accent)" />
      <circle cx="384" cy="120" r="2.5" fill="#4a3626" />
      <circle cx="384" cy="132" r="2.5" fill="#4a3626" />

      {/* video scrubber / playhead */}
      <text x="14" y="196" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#8a7560">00:12</text>
      <text x="386" y="196" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#8a7560">00:30</text>
      <rect x="14" y="204" width="372" height="4" rx="2" fill="#241509" />
      <rect x="14" y="204" width="150" height="4" rx="2" fill="var(--accent)" />
      <g fill="#3a2a1a">
        {[...Array(13)].map((_, i) => (<rect key={i} x={14 + i * 30} y="214" width="1.5" height="6" />))}
      </g>
      <circle cx="164" cy="206" r="6" fill="var(--accent)" stroke="#140b06" strokeWidth="2" />
    </svg>
  );
}

/* ---- Auto Detailing Manager — iOS/iPad business app ---- */
export function DetailingPreview() {
  return (
    <svg viewBox="0 0 400 250" style={wrap} preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="250" fill="#130b06" />
      <g transform="translate(150 18)">
        <rect x="-3" y="-3" width="106" height="220" rx="22" fill="#1d1207" stroke="#3a2a1a" />
        <rect x="3" y="3" width="94" height="208" rx="18" fill="#0f0a05" />
        <rect x="38" y="9" width="24" height="5" rx="2.5" fill="#3a2a1a" />

        {/* header */}
        <text x="14" y="32" fontFamily="Sora" fontSize="10" fontWeight="800" fill="#fdf6ef">FreshRide</text>
        <text x="86" y="32" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="6.5" fill="var(--accent)">Mo · 14 Apr</text>

        {/* appointment card */}
        <rect x="14" y="42" width="72" height="40" rx="9" fill="#1a1108" stroke="var(--accent)" strokeOpacity=".5" />
        <text x="20" y="55" fontFamily="Sora" fontSize="7.5" fontWeight="600" fill="#fdf6ef">M. Keller</text>
        <text x="20" y="65" fontFamily="Sora" fontSize="6" fill="#c9b8aa">BMW M3 · Full Detail</text>
        <rect x="20" y="70" width="34" height="9" rx="4.5" fill="var(--accent)" />
        <text x="37" y="76.6" textAnchor="middle" fontFamily="Sora" fontSize="5" fontWeight="700" fill="#241006">In Arbeit</text>
        <text x="80" y="55" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="var(--accent)">10:30</text>

        {/* photo coverage */}
        <text x="14" y="98" fontFamily="Sora" fontSize="6.5" fill="#c9b8aa">Vorher / Nachher</text>
        <text x="86" y="98" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="6.5" fill="#fdf6ef">8/12</text>
        <rect x="14" y="102" width="72" height="6" rx="3" fill="#241509" />
        <rect x="14" y="102" width="48" height="6" rx="3" fill="url(#detg)" />

        {/* zone checklist */}
        <g fontFamily="JetBrains Mono, monospace" fontSize="5">
          {['Front ✓', 'Heck ✓', 'Innen ✓', 'Felgen …'].map((t, i) => (
            <g key={i} transform={`translate(${14 + (i % 2) * 37} ${116 + Math.floor(i / 2) * 15})`}>
              <rect width="34" height="12" rx="4" fill="#1a1108" />
              <circle cx="7" cy="6" r="2.6" fill={i === 3 ? '#8a7560' : 'var(--accent)'} />
              <text x="13" y="8" fill="#c9b8aa">{t}</text>
            </g>
          ))}
        </g>

        {/* handover signed */}
        <rect x="14" y="150" width="72" height="20" rx="7" fill="var(--accent)" fillOpacity=".16" stroke="var(--accent)" strokeOpacity=".4" />
        <path d="M22 160l4 4 7-8" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <text x="38" y="163.5" fontFamily="Sora" fontSize="6.5" fill="#fdf6ef">Übergabe signiert</text>

        {/* tab bar */}
        <line x1="6" y1="184" x2="92" y2="184" stroke="#241509" />
        <g fill="#5a4636">
          <rect x="16" y="190" width="11" height="11" rx="2.5" fill="var(--accent)" />
          <circle cx="42" cy="195.5" r="5.5" />
          <rect x="56" y="190" width="11" height="11" rx="2.5" />
          <g fill="#5a4636"><rect x="76" y="190.5" width="11" height="2" rx="1" /><rect x="76" y="195" width="11" height="2" rx="1" /><rect x="76" y="199.5" width="11" height="2" rx="1" /></g>
        </g>
      </g>
      <text x="22" y="34" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#8a7560">SwiftUI · iCloud</text>
      <defs>
        <linearGradient id="detg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--accent)" /><stop offset="1" stopColor="#ff5147" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ---- Emergency alerts — iOS app, Firebase push to many devices ---- */
export function EmergencyPreview() {
  return (
    <svg viewBox="0 0 400 250" style={wrap} preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="250" fill="#150a07" />
      <circle cx="200" cy="92" r="64" fill="#ff5147" opacity=".12">
        <animate attributeName="r" values="54;70;54" dur="2.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values=".18;.04;.18" dur="2.2s" repeatCount="indefinite" />
      </circle>

      <g transform="translate(150 18)">
        <rect x="-3" y="-3" width="106" height="220" rx="22" fill="#1d100b" stroke="#3a221a" />
        <rect x="3" y="3" width="94" height="208" rx="18" fill="#0f0805" />
        <rect x="38" y="9" width="24" height="5" rx="2.5" fill="#3a221a" />

        {/* warning */}
        <path d="M50 26 L66 56 H34 Z" fill="none" stroke="var(--accent)" strokeWidth="2.6" strokeLinejoin="round" />
        <rect x="49" y="38" width="2.4" height="10" rx="1.2" fill="var(--accent)" />
        <circle cx="50.2" cy="52" r="1.6" fill="var(--accent)" />

        <text x="50" y="74" textAnchor="middle" fontFamily="Sora" fontSize="9" fontWeight="800" fill="#fdf6ef">EMERGENCY</text>
        <text x="50" y="86" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="6.5" fill="var(--accent)">broadcasting…</text>

        {/* device delivery list */}
        <g fontFamily="JetBrains Mono, monospace" fontSize="6">
          {['Dad — delivered', 'Mom — delivered', 'Unit 4 — delivered', 'Ops — sending'].map((t, i) => (
            <g key={i} transform={`translate(14 ${100 + i * 18})`}>
              <rect x="0" y="0" width="72" height="14" rx="4" fill="#1c100a" />
              <circle cx="9" cy="7" r="3" fill={i === 3 ? '#8a7560' : 'var(--accent)'} />
              <text x="17" y="9.5" fill="#c9b8aa">{t}</text>
            </g>
          ))}
        </g>
        <rect x="14" y="176" width="72" height="22" rx="11" fill="var(--accent)" />
        <text x="50" y="191" textAnchor="middle" fontFamily="Sora" fontSize="8" fontWeight="800" fill="#241006">SEND SOS</text>
      </g>
      <text x="22" y="34" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#8a7560">Firebase FCM</text>
    </svg>
  );
}
