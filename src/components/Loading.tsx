import loading from "../assets/loading.gif";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center pt-10 pb-[220px] bg-backgroundBlack">
      <h1 className="text-2xl font-semibold text-white mb-2">Carregando</h1>
      <img src={loading} className="w-12 h-12" />
    </div>
  );
}
