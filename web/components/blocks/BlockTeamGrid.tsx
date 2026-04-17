import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface TeamMember {
  _id: string;
  name: string;
  role?: string;
  bio?: string;
  photo?: any;
  email?: string;
  linkedIn?: string;
}

interface BlockTeamGridProps {
  heading?: string;
  subheading?: string;
  members?: TeamMember[];
  showAll?: boolean;
  columns?: 2 | 3 | 4;
  showBio?: boolean;
  showContact?: boolean;
}

export function BlockTeamGrid({
  heading,
  subheading,
  members,
  columns = 3,
  showBio = true,
  showContact = false,
}: BlockTeamGridProps) {
  if (!members || members.length === 0) return null;

  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className="block-background-overlay bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {(heading || subheading) && (
          <div className="mb-12 text-center">
            {heading && (
              <h2 className="text-faect-navy mb-4 text-3xl font-bold">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                {subheading}
              </p>
            )}
          </div>
        )}

        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-8`}>
          {members.map((member) => (
            <div
              key={member._id}
              className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              {member.photo?.asset && (
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={urlFor(member.photo).width(400).height(400).url()}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-faect-navy text-xl font-bold">
                  {member.name}
                </h3>
                {member.role && (
                  <p className="text-faect-blue mb-3 font-medium">
                    {member.role}
                  </p>
                )}
                {showBio && member.bio && (
                  <p className="line-clamp-4 text-sm text-gray-600">
                    {member.bio}
                  </p>
                )}
                {showContact && (member.email || member.linkedIn) && (
                  <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-4">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="hover:text-faect-blue text-gray-400 transition-colors"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </a>
                    )}
                    {member.linkedIn && (
                      <a
                        href={member.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-faect-blue text-gray-400 transition-colors"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
