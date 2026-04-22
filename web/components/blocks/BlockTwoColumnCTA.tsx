import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { getSectionStyles, type SectionSettings } from "./sectionUtils";

type SanityImage = {
  asset?: { _ref?: string; url?: string };
  [key: string]: unknown;
};

type BlockTwoColumnCTAProps = {
  centeredImage?: SanityImage;
  leftLabel?: string;
  leftHeading?: string;
  leftBody?: string;
  leftLinkText?: string;
  leftLinkHref?: string;
  leftButtonText?: string;
  leftButtonHref?: string;
  rightLabel?: string;
  rightHeading?: string;
  rightBody?: string;
  rightLinkText?: string;
  rightLinkHref?: string;
  rightButtonText?: string;
  rightButtonHref?: string;
  settings?: SectionSettings;
};

type ColumnProps = {
  label?: string;
  heading?: string;
  body?: string;
  linkText?: string;
  linkHref?: string;
  buttonText?: string;
  buttonHref?: string;
};

function Column({
  label,
  heading,
  body,
  linkText,
  linkHref,
  buttonText,
  buttonHref,
}: ColumnProps) {
  return (
    <div className="mx-8 flex flex-col items-center text-center">
      {label && (
        <span className="group hover:text-faect-blue relative mb-4 text-2xl font-medium text-gray-600 underline decoration-2 underline-offset-8 transition-all duration-200">
          &nbsp;&nbsp;&nbsp;&nbsp;{label}&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
      )}
      {heading && (
        <h2 className="text-faect-blue my-3 text-3xl lg:text-4xl">{heading}</h2>
      )}
      {body && (
        <p className="font-work-sans text-faect-gray mb-6 text-[1.2rem]/8 font-medium">
          {body}
        </p>
      )}
      {linkText && linkHref && (
        <Link
          href={linkHref}
          className="text-faect-blue hover:text-faect-navy mb-6 text-[1.3rem]/7 font-medium transition-opacity"
        >
          {linkText}
        </Link>
      )}
      {buttonText && buttonHref && (
        <Link
          href={buttonHref}
          className="border-faect-blue text-faect-blue font-ui nav-item-sweep lg:align-middle-left inline-block rounded-[8px] border bg-white px-8 py-1 text-[1.05rem] font-medium transition-all duration-900 ease-out hover:ml-2 hover:scale-110 hover:border-white hover:text-white"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}

export function BlockTwoColumnCTA({
  centeredImage,
  leftLabel,
  leftHeading,
  leftBody,
  leftLinkText,
  leftLinkHref,
  leftButtonText,
  leftButtonHref,
  rightLabel,
  rightHeading,
  rightBody,
  rightLinkText,
  rightLinkHref,
  rightButtonText,
  rightButtonHref,
  settings,
}: BlockTwoColumnCTAProps) {
  return (
    <section className={getSectionStyles(settings) ?? ""}>
      <div className="container mx-auto px-4">
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
              className="object-content-around h-auto w-2xl"
            />
          </div>
        )}

        <div className="mb-8 grid grid-cols-1 gap-18 lg:grid-cols-2">
          <Column
            label={leftLabel}
            heading={leftHeading}
            body={leftBody}
            linkText={leftLinkText}
            linkHref={leftLinkHref}
            buttonText={leftButtonText}
            buttonHref={leftButtonHref}
          />
          <Column
            label={rightLabel}
            heading={rightHeading}
            body={rightBody}
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
