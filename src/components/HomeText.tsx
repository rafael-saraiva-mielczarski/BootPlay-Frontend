import { useMediaQuery } from "@react-hook/media-query";

export default function HomeText() {
  const isWideScreen = useMediaQuery("(min-width: 640px)");

  return (
    <section className="ml-4 md:ml-8 my-40">
      <h1 className="text-white text-4xl md:text-5xl font-extrabold mb-4 leading-12">
        A história da música {isWideScreen && <br />}
        não pode ser esquecida!
      </h1>
      <p className="text-white text-1xl font-medium">
        Sucessos que marcaram o tempo!!!
      </p>
    </section>
  );
}
