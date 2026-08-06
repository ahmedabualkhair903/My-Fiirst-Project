const Loading = () => {
  return (
    <div role="status" className="max-w-sm animate-pulse">
      <div className="h-2.5 w-48 rounded-full bg-neutral-quaternary mb-4"></div>
      <div className="h-2 max-w-90 rounded-full bg-neutral-quaternary mb-2.5"></div>
      <div className="h-2 rounded-full bg-neutral-quaternary mb-2.5"></div>
      <div className="h-2 max-w-82.5 rounded-full bg-neutral-quaternary mb-2.5"></div>
      <div className="h-2 max-w-75 rounded-full bg-neutral-quaternary mb-2.5"></div>
      <div className="h-2 max-w-90 rounded-full bg-neutral-quaternary"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loading;