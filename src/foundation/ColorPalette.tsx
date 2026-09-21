import type { CSSProperties } from 'react'

export interface Swatch {
  name: string
  value: string
  note?: string
}

const gridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
  gap: 16,
}

const swatchStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}

const colorStyle: CSSProperties = {
  height: 64,
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--border-default)',
}

const nameStyle: CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--size-xs)',
  color: 'var(--text-muted)',
}

const noteStyle: CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--size-xs)',
  color: 'var(--text-muted)',
  opacity: 0.7,
}

export function ColorGrid({ swatches }: { swatches: Swatch[] }) {
  return (
    <div style={gridStyle}>
      {swatches.map((s) => (
        <div key={s.name} style={swatchStyle}>
          <div style={{ ...colorStyle, background: s.value }} />
          <span style={nameStyle}>{s.name}</span>
          {s.note && <span style={noteStyle}>{s.note}</span>}
        </div>
      ))}
    </div>
  )
}
