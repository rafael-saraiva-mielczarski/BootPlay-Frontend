interface UserDetaislCardProps {
  title: string;
  value: string | number | undefined;
}

export default function UserDetaislCard({
  title,
  value,
}: UserDetaislCardProps) {
  return (
    <div className="shadow-discCard bg-discCard flex mr-6 mb-6 rounded-md pl-4 pr-12 py-3">
      <div className="flex flex-col">
        <p className="text-xs font-medium mb-1">{title}</p>
        <h1 className="text-xl font-semibold">{value}</h1>
      </div>
    </div>
  );
}
