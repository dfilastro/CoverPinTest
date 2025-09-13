import { useState, useEffect } from 'react';

export default function SearchBox({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(localValue);
    }, 500);

    return () => clearTimeout(handler);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localValue]);

  return (
    <input
      type='text'
      className='border px-2 py-1 rounded'
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      placeholder='Search name/company'
    />
  );
}
