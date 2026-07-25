import { useState, forwardRef } from 'react';

const styles = `
.glass-input-wrapper {
  position: relative;
  width: 100%;
}

.glass-input {
  width: 100%;
  padding: 14px 18px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  box-sizing: border-box;
}

.glass-input::placeholder {
  color: rgba(255, 255, 255, 0.35);
}

.glass-input:hover {
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow:
    0 6px 20px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.glass-input:focus {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow:
    0 0 0 3px rgba(99, 102, 241, 0.15),
    0 6px 24px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.glass-input:focus + .glass-input-glow {
  opacity: 1;
}

.glass-input-glow {
  position: absolute;
  inset: -1px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2));
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: -1;
  filter: blur(8px);
}

/* Floating label */
.glass-input-floating {
  padding-top: 22px;
  padding-bottom: 8px;
}

.glass-input-floating + .glass-input-label-float {
  position: absolute;
  left: 18px;
  top: 16px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.4);
  pointer-events: none;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: left top;
}

.glass-input-floating:focus + .glass-input-label-float,
.glass-input-floating:not(:placeholder-shown) + .glass-input-label-float {
  transform: translateY(-10px) scale(0.8);
  color: rgba(99, 102, 241, 0.8);
}

/* Error state */
.glass-input-error {
  border-color: rgba(239, 68, 68, 0.5) !important;
}

.glass-input-error:focus {
  box-shadow:
    0 0 0 3px rgba(239, 68, 68, 0.15),
    0 6px 24px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
}

.glass-input-error-msg {
  margin-top: 6px;
  font-size: 12px;
  color: rgba(252, 165, 165, 0.8);
}

/* Size variants */
.glass-input-sm {
  padding: 10px 14px;
  font-size: 13px;
  border-radius: 10px;
}

.glass-input-lg {
  padding: 16px 20px;
  font-size: 16px;
  border-radius: 14px;
}

/* With icon */
.glass-input-icon-left {
  padding-left: 44px;
}

.glass-input-icon-right {
  padding-right: 44px;
}

.glass-input-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.35);
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.glass-input-icon-left-pos {
  left: 14px;
}

.glass-input-icon-right-pos {
  right: 14px;
}

/* Textarea */
.glass-textarea {
  min-height: 100px;
  resize: vertical;
  line-height: 1.6;
}

/* Select */
.glass-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 40px;
}

/* Label */
.glass-input-label {
  display: block;
  margin-bottom: 8px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.02em;
}

.glass-input-label-req {
  color: rgba(239, 68, 68, 0.8);
  margin-left: 2px;
}
`;

if (typeof document !== 'undefined' && !document.getElementById('glass-input-styles')) {
  const styleEl = document.createElement('style');
  styleEl.id = 'glass-input-styles';
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);
}

const GlassInput = forwardRef(function GlassInput({
  label,
  required = false,
  floating = false,
  error,
  helperText,
  size = 'default',
  iconLeft,
  iconRight,
  type = 'text',
  textarea = false,
  select = false,
  options = [],
  className = '',
  ...rest
}, ref) {
  const [focused, setFocused] = useState(false);

  const wrapperClasses = ['glass-input-wrapper', className].filter(Boolean).join(' ');
  
  const sizeClass = size !== 'default' ? `glass-input-${size}` : '';
  const floatingClass = floating ? 'glass-input-floating' : '';
  const errorClass = error ? 'glass-input-error' : '';
  const iconLeftClass = iconLeft ? 'glass-input-icon-left' : '';
  const iconRightClass = iconRight ? 'glass-input-icon-right' : '';

  const inputClasses = [
    'glass-input',
    textarea ? 'glass-textarea' : '',
    select ? 'glass-select' : '',
    sizeClass,
    floatingClass,
    errorClass,
    iconLeftClass,
    iconRightClass,
  ].filter(Boolean).join(' ');

  const Tag = textarea ? 'textarea' : select ? 'select' : 'input';

  return (
    <div className={wrapperClasses}>
      {label && !floating && (
        <label className="glass-input-label">
          {label}
          {required && <span className="glass-input-label-req">*</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {iconLeft && (
          <span className="glass-input-icon glass-input-icon-left-pos">{iconLeft}</span>
        )}
        <Tag
          ref={ref}
          className={inputClasses}
          type={textarea || select ? undefined : type}
          placeholder={floating ? ' ' : rest.placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        >
          {select && options.map(opt => (
            <option key={opt.value} value={opt.value} style={{ background: '#1a1a2e', color: '#fff' }}>
              {opt.label}
            </option>
          ))}
        </Tag>
        {floating && label && (
          <label className="glass-input-label-float glass-input-label">
            {label}
            {required && <span className="glass-input-label-req">*</span>}
          </label>
        )}
        <div className="glass-input-glow" />
        {iconRight && (
          <span className="glass-input-icon glass-input-icon-right-pos">{iconRight}</span>
        )}
      </div>
      {error && <p className="glass-input-error-msg">{error}</p>}
      {helperText && !error && <p className="glass-input-error-msg" style={{ color: 'rgba(255,255,255,0.35)' }}>{helperText}</p>}
    </div>
  );
});

export default GlassInput;
