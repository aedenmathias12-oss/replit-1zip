export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="w-8 h-8 border-3 border-[#e8efe4] border-t-[#6b8f5e] rounded-full animate-spin" />
    </div>
  );
}
