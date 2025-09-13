export type HighlightTextProps = {
  text: string;
  className?: string;
  searchTerm: string;
  caseSensitive?: boolean;
  'data-testid'?: string;
};

export default function HighlightText({
  text,
  className,
  searchTerm,
  caseSensitive = false,
  'data-testid': dataTestId = 'highlight-text',
}: HighlightTextProps) {
  if (!searchTerm || !text)
    return (
      <span className={className} data-testid={dataTestId}>
        {text}
      </span>
    );

  const parts = text?.split(new RegExp(`(${searchTerm})`, caseSensitive ? 'g' : 'gi'));

  const compareText = (a: string, b: string) => {
    if (caseSensitive) {
      return a === b;
    }

    return a.toLowerCase() === b.toLowerCase();
  };

  return (
    <span className={className} data-testid={dataTestId}>
      {parts.map((part, i) =>
        compareText(part, searchTerm) ? (
          <mark key={i} className='bg-yellow-300 rounded-sm'>
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
}
