export default function Time({ data }: { data: number; }) {
  const time = new Date(data);
  const minute = time.getMinutes();
  return (
    <p className="cursor-default opacity-60 font-semibold text-xs">
      {time.getHours()}:{minute < 10 ? "0" + minute : minute}
    </p>
  );
}
