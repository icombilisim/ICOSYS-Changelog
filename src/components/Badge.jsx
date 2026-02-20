/**
 * Badge component for module labels and change type indicators.
 *
 * @param {string} text - Display text
 * @param {string} color - Hex color
 * @param {boolean} outline - Outline style instead of filled
 */
export default function Badge({ text, color, outline }) {
  return (
    <span
      className="badge"
      style={{
        background: outline ? 'transparent' : color + '18',
        color: color,
        border: outline ? `1.5px solid ${color}44` : 'none',
      }}
    >
      {text}
    </span>
  );
}
