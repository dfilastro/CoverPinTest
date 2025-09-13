export default function TableSkeleton({ rows }: { rows: number }) {
  return (
    <div className='w-full flex flex-col gap-1'>
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className='w-full bg-gray-200 animate-pulse h-10' />
      ))}
    </div>
  );
}
