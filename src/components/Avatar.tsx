import Image from "next/image";

interface Props {
  alt: string;
  fallback: string;
  src?: string | null;
}

const Avatar = ({ alt, fallback, src }: Props) => {
  return src ? (
    <Image
      className="rounded w-4 h-4"
      src={src}
      alt={alt}
      width={24}
      height={24}
    />
  ) : (
    <span className="bg-stone-500 flex items-center justify-center text-xs rounded w-4 h-4">
      {fallback}
    </span>
  );
};

export default Avatar;
