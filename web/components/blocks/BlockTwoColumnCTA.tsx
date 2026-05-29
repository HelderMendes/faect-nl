"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";
import { getSectionStyles, cn, type SectionSettings } from "./sectionUtils";
import { usePathname } from "next/navigation";

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
  leftBodyRich?: PortableTextBlock[];
  leftLinkText?: string;
  leftLinkHref?: string;
  leftButtonText?: string;
  leftButtonHref?: string;
  rightImage?: SanityImage;
  rightLabel?: string;
  rightHeading?: string;
  rightBody?: string;
  rightBodyRich?: PortableTextBlock[];
  rightLinkText?: string;
  rightLinkHref?: string;
  rightButtonText?: string;
  rightButtonHref?: string;
  leftColumnAlign?: ColumnAlign;
  rightColumnAlign?: ColumnAlign;
  settings?: SectionSettings;
};

type ColumnProps = {
  image?: SanityImage;
  imageAtBottom?: boolean;
  align?: ColumnAlign;
  label?: string;
  heading?: string;
  body?: string;
  bodyRich?: PortableTextBlock[];
  linkText?: string;
  linkHref?: string;
  buttonText?: string;
  buttonHref?: string;
};

function Column({
  image,
  imageAtBottom = false,
  align = "center",
  label,
  heading,
  body,
  bodyRich,
  linkText,
  linkHref,
  buttonText,
  buttonHref,
}: ColumnProps) {
  const pathname = usePathname();
  const isAflopendeMicrosoftSupportPage =
    pathname ===
    "/aflopende-microsoft-support-voor-navision-versies-2016-2017-en-2018";

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
              "hover:text-faect-blue relative text-2xl font-medium text-gray-600 underline decoration-2 underline-offset-8 transition-all duration-200",
            )}
          >
            <span className={align === "left" ? "xl:hidden" : undefined}>
              &nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            {label}&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
        )}

        {isAflopendeMicrosoftSupportPage
          ? heading && (
              <h2
                className={cn(
                  "font-cairo text-faect-blue text-left text-3xl font-extrabold lg:text-4xl",
                )}
              >
                {heading}
              </h2>
            )
          : heading && (
              <h2
                className={cn(
                  "font-cairo text-faect-blue text-3xl font-extrabold lg:text-4xl",
                )}
              >
                {heading}
              </h2>
            )}

        {bodyRich && bodyRich.length > 0 ? (
          <div
            className={cn(
              "font-work-sans text-faect-gray mb-3 text-left text-[1.2rem]/8 font-medium",
            )}
          >
            <PortableText
              value={bodyRich}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="mb-3 last:mb-0">{children}</p>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="my-4 list-disc space-y-2 pl-6 text-left marker:text-slate-500">
                      {children}
                    </ul>
                  ),
                },
                listItem: {
                  bullet: ({ children }) => (
                    <li className="leading-relaxed">{children}</li>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="text-faect-navy font-bold">
                      {children}
                    </strong>
                  ),
                },
              }}
            />
          </div>
        ) : body ? (
          <p
            className={cn(
              "font-work-sans text-faect-gray mb-3 text-[1.2rem]/8 font-medium",
            )}
          >
            {body}
          </p>
        ) : null}
        {linkText && linkHref && (
          <Link
            href={linkHref}
            className={cn(
              "text-faect-blue hover:text-faect-navy text-[1.3rem]/7 font-medium transition-opacity",
            )}
          >
            {linkText}
          </Link>
        )}
        {buttonText && buttonHref && (
          <Link
            href={buttonHref}
            className={cn(
              "font-ui nav-item-sweep border-faect-blue text-faect-blue inline-block rounded-[8px] border bg-white px-8 py-1 text-[1.05rem] font-medium transition-all duration-900 ease-out hover:ml-2 hover:scale-110 hover:border-white hover:text-white",
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
  leftBodyRich,
  leftLinkText,
  leftLinkHref,
  leftButtonText,
  leftButtonHref,
  rightImage,
  rightLabel,
  rightHeading,
  rightBody,
  rightBodyRich,
  rightLinkText,
  rightLinkHref,
  rightButtonText,
  rightButtonHref,
  leftColumnAlign = "center",
  rightColumnAlign = "center",
  settings,
}: BlockTwoColumnCTAProps) {
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
            bodyRich={leftBodyRich}
            linkText={leftLinkText}
            linkHref={leftLinkHref}
            buttonText={leftButtonText}
            buttonHref={leftButtonHref}
          />
          <Column
            image={rightImage}
            imageAtBottom
            align={rightColumnAlign}
            label={rightLabel}
            heading={rightHeading}
            body={rightBody}
            bodyRich={rightBodyRich}
            linkText={rightLinkText}
            linkHref={rightLinkHref}
            buttonText={rightButtonText}
            buttonHref={rightButtonHref}
          />
        </div>
      </div>
    </section>
  );
}
