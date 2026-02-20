/**
 * Search input for filtering releases by keyword.
 *
 * @param {string} value - Current search term
 * @param {Function} onChange - Callback on input change
 */
export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-wrapper">
      <span className="search-icon">⌕</span>
      <input
        type="text"
        className="search-input"
        placeholder="Search... (e.g. versioning, S3, workflow)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
