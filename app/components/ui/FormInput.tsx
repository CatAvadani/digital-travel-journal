interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  value?: string | number | undefined;
  placeholder?: string;
  maxLength?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
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
}: FormInputProps) {
  return (
    <>
      <label htmlFor={id} className='block text-base font-medium text-white'>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        maxLength={maxLength}
        className='text-white block w-full p-2 h-12 rounded-md bg-white/10 '
      />
    </>
  );
}
