import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'AgentAuth — a pass for your AI agents, not your master key';

const SHIELD =
  'M48 24 L70 50 Q85 58 100 54 Q115 58 130 50 L152 24 Q170 50 170 78 C168 126 146 162 100 186 C54 162 32 126 30 78 Q30 50 48 24 Z';

const fox = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="320" height="320">
<path d="${SHIELD}" fill="#2C2733"/>
<g transform="translate(100 100) scale(0.88) translate(-100 -100)"><path d="${SHIELD}" fill="#E88A30"/></g>
<path d="M48 24 L41 41 L60 40 Z" fill="#2C2733"/><path d="M152 24 L159 41 L140 40 Z" fill="#2C2733"/>
<path d="M100 104 C126 104 138 122 133 142 C128 159 112 167 100 168 C88 167 72 159 67 142 C62 122 74 104 100 104 Z" fill="#FBEFD9"/>
<ellipse cx="72" cy="94" rx="9" ry="10.5" fill="#2C2733"/><circle cx="75" cy="90" r="2.8" fill="#fff"/>
<ellipse cx="128" cy="94" rx="9" ry="10.5" fill="#2C2733"/><circle cx="131" cy="90" r="2.8" fill="#fff"/>
<circle cx="100" cy="120" r="8" fill="#2C2733"/><path d="M100 124 L106 146 Q100 151 94 146 Z" fill="#2C2733"/>
</svg>`;
const foxData = `data:image/svg+xml;utf8,${encodeURIComponent(fox)}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '90px',
          background: '#211a14',
          color: '#F7F1E8',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '620px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: 30, fontWeight: 600, color: '#F0A24A' }}>
            <div style={{ width: 14, height: 14, borderRadius: 99, background: '#E88A30' }} />
            AgentAuth
          </div>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, marginTop: 28, letterSpacing: '-0.03em' }}>
            A pass for your AI agents, not your master key.
          </div>
          <div style={{ fontSize: 27, color: '#C8BBA8', marginTop: 26 }}>
            Scoped, short-lived, revocable tokens for AI agents and MCP servers.
          </div>
          <div style={{ fontSize: 21, color: '#9A8C78', marginTop: 34 }}>open source · MIT · agentauth-site.vercel.app</div>
        </div>
        <div
          style={{
            display: 'flex',
            width: 360,
            height: 360,
            borderRadius: 999,
            border: '1px solid #43382c',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 'none',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={foxData} width={320} height={320} alt="" />
        </div>
      </div>
    ),
    { ...size },
  );
}
