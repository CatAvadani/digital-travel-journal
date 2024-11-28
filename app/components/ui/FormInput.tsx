interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  value?: string | number | undefined;
  placeholder?: string;
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
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className='block text-base font-medium'>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className='text-white block w-full p-2 h-12 rounded-md bg-white/10 focus:outline-none focus:ring-0'
      />
    </div>
  );
}
