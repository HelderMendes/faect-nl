import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { getSectionStyles, cn, type SectionSettings } from "./sectionUtils";

type SanityImage = {
  asset?: { _ref?: string; url?: string };
  [key: string]: unknown;
};

type ColumnAlign = "center" | "left" | "right";

const xlText: Record<ColumnAlign, string> = {
  center: "xl:text-center",
  left: "xl:text-left",
  right: "xl:text-right",
};

const xlItems: Record<ColumnAlign, string> = {
  center: "xl:items-center",
  left: "xl:items-start",
  right: "xl:items-end",
};

type BlockTwoColumnCTAProps = {
  centeredImage?: SanityImage;
  leftImage?: SanityImage;
  leftLabel?: string;
  leftHeading?: string;
  leftBody?: string;
  leftLinkText?: string;
  leftLinkHref?: string;
  leftButtonText?: string;
  leftButtonHref?: string;
  rightImage?: SanityImage;
  rightLabel?: string;
  rightHeading?: string;
  rightBody?: string;
  rightLinkText?: string;
  rightLinkHref?: string;
  rightButtonText?: string;
  rightButtonHref?: string;
  leftColumnAlign?: ColumnAlign;
  rightColumnAlign?: ColumnAlign;
  settings?: SectionSettings;
};

const DARK_BACKGROUNDS = new Set(["navy", "dither"]);

type ColumnProps = {
  image?: SanityImage;
  imageAtBottom?: boolean;
  align?: ColumnAlign;
  label?: string;
  heading?: string;
  body?: string;
  linkText?: string;
  linkHref?: string;
  buttonText?: string;
  buttonHref?: string;
  isDark?: boolean;
};

function Column({
  image,
  imageAtBottom = false,
  align = "center",
  label,
  heading,
  body,
  linkText,
  linkHref,
  buttonText,
  buttonHref,
  isDark = false,
}: ColumnProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center px-4 text-center xl:px-0",
        xlText[align],
        xlItems[align],
      )}
    >
      {image?.asset && (
        <div
          className={cn(
            "mb-6 w-full",
            imageAtBottom && "md:order-last md:mt-8 md:mb-0",
          )}
        >
          <Image
            src={image.asset.url || urlFor(image).width(640).url()}
            alt={heading ?? ""}
            width={640}
            height={420}
            className="mx-auto h-auto w-full max-w-lg rounded-xl object-cover lg:max-w-full"
          />
        </div>
      )}
      <div className={cn("flex flex-col items-center gap-4", xlItems[align])}>
        {label && (
          <p
            className={cn(
              "relative text-2xl font-medium underline decoration-2 underline-offset-8 transition-all duration-200",
              isDark
                ? "text-white/60 hover:text-white"
                : "hover:text-faect-blue text-gray-600",
            )}
          >
            <span className={align === "left" ? "xl:hidden" : undefined}>
              &nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            {label}&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
        )}
        {heading && (
          <h2
            className={cn(
              "font-cairo text-faect-blue text-3xl font-extrabold lg:text-4xl",
            )}
          >
            {heading}
          </h2>
        )}
        {body && (
          <p
            className={cn(
              "font-work-sans mb-3 text-[1.2rem]/8 font-medium",
              isDark ? "text-white/90" : "text-faect-gray",
            )}
          >
            {body}
          </p>
        )}
        {linkText && linkHref && (
          <Link
            href={linkHref}
            className={cn(
              "text-[1.3rem]/7 font-medium transition-opacity",
              isDark
                ? "text-white/80 hover:text-white"
                : "text-faect-blue hover:text-faect-navy",
            )}
          >
            {linkText}
          </Link>
        )}
        {buttonText && buttonHref && (
          <Link
            href={buttonHref}
            className={cn(
              "font-ui nav-item-sweep inline-block rounded-[8px] border bg-white px-8 py-1 text-[1.05rem] font-medium transition-all duration-900 ease-out hover:ml-2 hover:scale-110",
              isDark
                ? "text-faect-navy border-faect-blue -mb-10 hover:border-white hover:text-white"
                : "border-faect-blue text-faect-blue hover:border-white hover:text-white",
            )}
          >
            {buttonText}
          </Link>
        )}
      </div>
    </div>
  );
}

export function BlockTwoColumnCTA({
  centeredImage,
  leftImage,
  leftLabel,
  leftHeading,
  leftBody,
  leftLinkText,
  leftLinkHref,
  leftButtonText,
  leftButtonHref,
  rightImage,
  rightLabel,
  rightHeading,
  rightBody,
  rightLinkText,
  rightLinkHref,
  rightButtonText,
  rightButtonHref,
  leftColumnAlign = "center",
  rightColumnAlign = "center",
  settings,
}: BlockTwoColumnCTAProps) {
  const isDark = DARK_BACKGROUNDS.has(settings?.backgroundColor ?? "");

  return (
    <section className={getSectionStyles(settings) ?? ""}>
      <div className="container mx-auto px-4 lg:px-8">
        {centeredImage?.asset && (
          <div className="my-8 flex justify-center">
            <Image
              src={
                centeredImage.asset.url ||
                urlFor(centeredImage).width(910).url()
              }
              alt=""
              width={910}
              height={520}
              className="h-auto w-full max-w-2xl object-cover"
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-20 pb-12 lg:grid-cols-2 lg:gap-14">
          <Column
            image={leftImage}
            align={leftColumnAlign}
            label={leftLabel}
            heading={leftHeading}
            body={leftBody}
            linkText={leftLinkText}
            linkHref={leftLinkHref}
            buttonText={leftButtonText}
            buttonHref={leftButtonHref}
            isDark={isDark}
          />
          <Column
            image={rightImage}
            imageAtBottom
            align={rightColumnAlign}
            label={rightLabel}
            heading={rightHeading}
            body={rightBody}
            linkText={rightLinkText}
            linkHref={rightLinkHref}
            buttonText={rightButtonText}
            buttonHref={rightButtonHref}
            isDark={isDark}
          />
        </div>
      </div>
    </section>
  );
}
