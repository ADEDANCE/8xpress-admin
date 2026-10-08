
type InputProps = {
  label?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
   className?: string;
};

const Input = ({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  error,
  className,
  ...props
}:InputProps) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-300">
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg border bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-gray-500
          ${
            error
              ? "border-red-500"
              : "border-zinc-700 focus:border-red-500"
          }`}
        {...props}
      />

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;