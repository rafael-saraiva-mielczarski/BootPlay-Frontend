import { removeDecimal } from "@/utils/removeDecimal";

interface AlbumCardProps {
  key?: number;
  image?: string;
  onClick?: () => void;
  albumName?: string;
  value?: number;
  style?: string;
}

export default function AlbumCard({
  key,
  image,
  onClick,
  albumName,
  value,
  style,
}: AlbumCardProps) {
  return (
    <div className="pr-8">
      <div
        key={key}
        style={
          {
            "--bg-fundoAuth": `url(${image})`,
          } as React.CSSProperties
        }
        className={style}
      >
        <div
          onClick={onClick}
          className="flex flex-col h-full justify-center items-center backdrop-brightness-50 p-6 cursor-pointer shadow-3xl rounded-md"
        >
          <h1 className="text-2xl grow font-bold text-center mt-8 text-white">
            {albumName}
          </h1>
          <p className="text-2xl font-semibold self-end text-white">
            R$ {removeDecimal(value)}
          </p>
        </div>
      </div>
    </div>
  );
}
