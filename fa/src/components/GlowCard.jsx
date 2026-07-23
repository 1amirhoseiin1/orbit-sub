// Shared surface for every card in the panel. Keeping the glass/glow/blur
// recipe in one place means changing it once changes it everywhere.
// Lower fill opacity + a top sheen is what actually reads as "glass" -
// blur alone just looks like a slightly soft solid panel.
export default function GlowCard({ children, className = '', as: Tag = 'div', ...rest }) {
  return (
    <Tag
      className={`group relative isolate overflow-hidden rounded-panel border border-white/[0.08]
        bg-surface/40 backdrop-blur-panel shadow-panel transition-all duration-200
        before:pointer-events-none before:absolute before:inset-0 before:-z-10
        before:bg-gradient-to-b before:from-white/[0.06] before:to-transparent
        hover:border-accent-blue/40 hover:shadow-glow hover:bg-surface/50 ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
