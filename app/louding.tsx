
const Loading = () => {
  return (
    <main className="min-h-[70vh] flex items-center justify-center">

      <div className="flex flex-col items-center gap-4">

        <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin" />

        <p className="text-gray-500">
          Loading...
        </p>

      </div>

    </main>
  );
};

export default Loading;

