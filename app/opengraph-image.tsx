import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'AgentAuth — a pass for your AI agents, not your master key';

const fox = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="330" height="330">
<path fill="#E08A3A" d="M168 78 L344 78 Q380 78 380 114 L380 268 C380 358 330 408 256 446 C182 408 132 358 132 268 L132 114 Q132 78 168 78 Z"/>
<path fill="#FBEFD9" d="M198 128 L219 188 Q256 202 293 188 L314 128 C331 157 337 207 327 248 C319 305 290 348 256 372 C222 348 193 305 185 248 C175 207 181 157 198 128 Z"/>
<circle cx="226" cy="214" r="11" fill="#E08A3A"/><circle cx="286" cy="214" r="11" fill="#E08A3A"/>
<circle cx="256" cy="252" r="17" fill="#E08A3A"/><path d="M256 260 L271 308 Q256 316 241 308 Z" fill="#E08A3A"/>
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
