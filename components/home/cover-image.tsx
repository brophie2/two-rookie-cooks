import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import { Suspense, useState } from "react";
import Skeleton from "../common/skeleton";

type Props = {
  title: string;
  src: string;
  slug?: string;
  className?: string;
};

const CoverImage = ({ title, src, slug, className }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn(className, "shadow-sm", `${loaded ? "w-full" : "w-0"}`, {
        "hover:shadow-lg transition-shadow duration-200": slug,
      })}
      // priority={true}
      width={1300}
      height={630}
      // loading="lazy"
      onLoadingComplete={() => {
        setLoaded(true);
      }}
    />
  );
  return (
    <div className="sm:mx-0">
      {!loaded && <Skeleton className={className} />}
      <Suspense fallback={<Skeleton />}>
        {slug ? (
          <Link
            as={`/recipes/${slug}`}
            href="/recipes/[slug]"
            aria-label={title}
            className="hover:underline"
          >
            {image}
          </Link>
        ) : (
          image
        )}
      </Suspense>
    </div>
  );
};

export default CoverImage;
