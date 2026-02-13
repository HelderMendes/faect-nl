import Link from 'next/link'

interface BlockContactInfoProps {
  heading?: string
  text?: string
  useGlobalSettings?: boolean
  customAddress?: string
  customPhone?: string
  customEmail?: string
  showMap?: boolean
  mapEmbedUrl?: string
  showSocialLinks?: boolean
  // These would come from site settings when useGlobalSettings is true
  siteSettings?: {
    address?: {
      street?: string
      postalCode?: string
      city?: string
      country?: string
    }
    phone?: string
    email?: string
    socialLinks?: Array<{
      _key: string
      platform: string
      url: string
    }>
  }
}

export function BlockContactInfo({
  heading,
  text,
  useGlobalSettings = true,
  customAddress,
  customPhone,
  customEmail,
  showMap = false,
  mapEmbedUrl,
  showSocialLinks = true,
  siteSettings,
}: BlockContactInfoProps) {
  // Use global settings or custom values
  const address = useGlobalSettings && siteSettings?.address
    ? `${siteSettings.address.street}, ${siteSettings.address.postalCode} ${siteSettings.address.city}`
    : customAddress

  const phone = useGlobalSettings ? siteSettings?.phone : customPhone
  const email = useGlobalSettings ? siteSettings?.email : customEmail
  const socialLinks = useGlobalSettings ? siteSettings?.socialLinks : []

  const socialIcons: Record<string, React.ReactNode> = {
    linkedin: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    twitter: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    facebook: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {(heading || text) && (
            <div className="text-center mb-12">
              {heading && (
                <h2 className="text-3xl font-bold text-faect-navy mb-4">{heading}</h2>
              )}
              {text && <p className="text-lg text-gray-600">{text}</p>}
            </div>
          )}

          <div className={`grid ${showMap ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-12`}>
            {/* Contact Details */}
            <div className="space-y-6">
              {address && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-faect-blue/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-faect-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-faect-navy mb-1">Adres</h3>
                    <p className="text-gray-600">{address}</p>
                  </div>
                </div>
              )}

              {phone && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-faect-blue/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-faect-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-faect-navy mb-1">Telefoon</h3>
                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-gray-600 hover:text-faect-blue transition-colors">
                      {phone}
                    </a>
                  </div>
                </div>
              )}

              {email && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-faect-blue/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-faect-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-faect-navy mb-1">E-mail</h3>
                    <a href={`mailto:${email}`} className="text-gray-600 hover:text-faect-blue transition-colors">
                      {email}
                    </a>
                  </div>
                </div>
              )}

              {showSocialLinks && socialLinks && socialLinks.length > 0 && (
                <div className="flex items-center gap-4 pt-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link._key}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-faect-navy text-white flex items-center justify-center hover:bg-faect-blue transition-colors"
                    >
                      {socialIcons[link.platform] || link.platform}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Map */}
            {showMap && mapEmbedUrl && (
              <div className="rounded-xl overflow-hidden shadow-lg h-80">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{border: 0}}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
