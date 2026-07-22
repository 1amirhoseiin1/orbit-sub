import { IconButton, Tooltip } from '@mui/material';

const TINTS = {
  blue: { base: 'rgba(59,130,246,0.14)', border: 'rgba(59,130,246,0.35)', color: '#60A5FA' },
  violet: { base: 'rgba(139,92,246,0.14)', border: 'rgba(139,92,246,0.35)', color: '#A78BFA' },
  green: { base: 'rgba(34,197,94,0.16)', border: 'rgba(34,197,94,0.4)', color: '#4ADE80' }
};

// Small glass chip for copy/QR-style actions. `success` swaps it to the
// green "done" tint regardless of `tint`, with a quick pop-in animation
// on the icon so the confirmation actually reads as feedback.
export default function IconActionButton({ icon, tooltip, tint = 'blue', success = false, onClick, ariaLabel }) {
  const active = TINTS[success ? 'green' : tint];

  return (
    <Tooltip title={tooltip}>
      <IconButton
        size="small"
        onClick={onClick}
        aria-label={ariaLabel}
        sx={{
          width: 34,
          height: 34,
          borderRadius: '10px',
          color: active.color,
          background: active.base,
          border: '1px solid',
          borderColor: active.border,
          transition: 'transform 200ms, background 200ms, border-color 200ms, box-shadow 200ms',
          '&:hover': {
            background: active.base,
            transform: 'translateY(-1px) scale(1.05)',
            boxShadow: `0 0 0 1px ${active.border}, 0 4px 14px ${active.base}`
          },
          '&:active': { transform: 'translateY(0) scale(0.96)' },
          '& svg': {
            fontSize: 17,
            animation: success ? 'icon-pop 320ms cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none'
          }
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}
