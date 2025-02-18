interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  value?: string | number | undefined;
  placeholder?: string;
  maxLength?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
}

export default function FormInput({
  id,
  label,
  type = 'text',
  value,
  placeholder,
  onChange,
  disabled = false,
  maxLength,
  ref,
}: FormInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === 'text' && e.key === ' ') {
      if (id !== 'description' && id !== 'title') {
        e.preventDefault();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (type === 'text' && id !== 'description' && id !== 'title') {
      e.target.value = newValue.trim();
    }
    onChange(e);
  };

  return (
    <>
      <label
        htmlFor={id}
        className='block text-base font-medium text-white  drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]'
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        maxLength={maxLength}
        ref={ref}
        className='text-white block w-full p-2 h-12 rounded-md bg-[#110915]/50 border border-white/10 '
      />
    </>
  );
}
