/**
 * Module tab filter bar.
 *
 * @param {Object} modules - Module definitions from modules.json
 * @param {string} active - Currently active module key
 * @param {Function} onSelect - Callback when a tab is selected
 */
export default function ModuleFilter({ modules, active, onSelect }) {
  return (
    <div className="module-filter">
      {Object.entries(modules).map(([key, mod]) => (
        <button
          key={key}
          className={`module-tab${active === key ? ' module-tab--active' : ''}`}
          style={
            active === key
              ? { background: mod.color + '22', color: mod.color }
              : {}
          }
          onClick={() => onSelect(key)}
        >
          {mod.label}
        </button>
      ))}
    </div>
  );
}
