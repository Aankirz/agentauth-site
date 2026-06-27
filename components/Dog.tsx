export function Dog({ className = 'dog-illu' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 264" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Watchdog, the AgentAuth guard dog">
      <title>Watchdog</title>
      <defs>
        <linearGradient id="furGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EFB457" />
          <stop offset="1" stopColor="#DB8A28" />
        </linearGradient>
      </defs>
      <g id="dog-bob">
        <g id="dog-tail">
          <path d="M168 206 C148 210 150 168 176 150 C198 134 208 152 197 170 C190 182 188 198 178 208 Z" fill="#CE8327" />
        </g>
        <path d="M120 120 C170 120 180 172 171 207 C166 230 142 240 120 240 C98 240 74 230 69 207 C60 172 70 120 120 120 Z" fill="url(#furGrad)" />
        <path d="M120 150 C138 150 147 182 140 207 C136 224 124 232 120 232 C116 232 104 224 100 207 C93 182 102 150 120 150 Z" fill="#FBE9CC" />
        <rect x="95" y="196" width="20" height="44" rx="10" fill="url(#furGrad)" />
        <rect x="125" y="196" width="20" height="44" rx="10" fill="url(#furGrad)" />
        <ellipse cx="105" cy="237" rx="12" ry="7" fill="#FBE9CC" />
        <ellipse cx="135" cy="237" rx="12" ry="7" fill="#FBE9CC" />
        <g id="dog-head">
          <g className="dog-ear-l">
            <path d="M72 54 C58 30 66 18 80 30 C92 40 97 56 96 68 C84 66 78 62 72 54 Z" fill="#CE8327" />
            <path d="M78 52 C70 38 74 32 81 40 C87 47 89 56 89 64 C83 62 80 58 78 52 Z" fill="#FBE9CC" />
          </g>
          <g className="dog-ear-r">
            <path d="M168 54 C182 30 174 18 160 30 C148 40 143 56 144 68 C156 66 162 62 168 54 Z" fill="#CE8327" />
            <path d="M162 52 C170 38 166 32 159 40 C153 47 151 56 151 64 C157 62 160 58 162 52 Z" fill="#FBE9CC" />
          </g>
          <path d="M120 42 C158 42 179 68 179 100 C179 130 153 148 120 148 C87 148 61 130 61 100 C61 68 82 42 120 42 Z" fill="url(#furGrad)" />
          <path d="M120 98 C151 98 164 112 159 127 C153 143 134 149 120 149 C106 149 87 143 81 127 C76 112 89 98 120 98 Z" fill="#FBE9CC" />
          <ellipse cx="98" cy="80" rx="7.5" ry="5" fill="#FBE9CC" />
          <ellipse cx="142" cy="80" rx="7.5" ry="5" fill="#FBE9CC" />
          <g className="dog-eye"><ellipse cx="100" cy="94" rx="7" ry="9" fill="#3B3340" /><circle cx="102.4" cy="90.5" r="2.1" fill="#fff" /></g>
          <g className="dog-eye"><ellipse cx="140" cy="94" rx="7" ry="9" fill="#3B3340" /><circle cx="142.4" cy="90.5" r="2.1" fill="#fff" /></g>
          <path d="M120 104 C127 104 130 109 127 113 C125 116 120 118 120 118 C120 118 115 116 113 113 C110 109 113 104 120 104 Z" fill="#3B3340" />
          <path d="M120 118 V124" stroke="#3B3340" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M120 124 C112 132 105 130 101 125" fill="none" stroke="#3B3340" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M120 124 C128 132 135 130 139 125" fill="none" stroke="#3B3340" strokeWidth="2.4" strokeLinecap="round" />
        </g>
        <path d="M83 150 Q120 168 157 150 L157 162 Q120 180 83 162 Z" fill="#1FB4A3" />
        <circle cx="120" cy="169" r="9.5" fill="#F4C44E" />
        <path d="M120 163 l5 2 v4 q0 4 -5 6 q-5 -2 -5 -6 v-4 z" fill="#3B3340" />
      </g>
    </svg>
  );
}

export function Paw({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="paw" style={{ display: 'block' }}>
      <ellipse cx="6.5" cy="9" rx="2.4" ry="3.1" />
      <ellipse cx="10.4" cy="5.6" rx="2.3" ry="3.1" />
      <ellipse cx="14.6" cy="5.6" rx="2.3" ry="3.1" />
      <ellipse cx="18" cy="9" rx="2.4" ry="3.1" />
      <path d="M12 11.4c3.2 0 5.6 2.1 5.6 4.7 0 2.2-1.9 3.4-4 3.4-0.7 0-1.1-0.3-1.6-0.3s-0.9 0.3-1.6 0.3c-2.1 0-4-1.2-4-3.4 0-2.6 2.4-4.7 5.6-4.7z" />
    </svg>
  );
}
