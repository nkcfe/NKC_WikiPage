export default function Loading() {
  return (
    <>
      <div className="h-20 w-full animate-pulse rounded-md bg-gray-200" />
      {[...Array(10)].map((e, i) => (
        <div
          key={i}
          className="mt-2 h-20 w-full animate-pulse rounded-md bg-gray-200"
        />
      ))}
    </>
  );
}
