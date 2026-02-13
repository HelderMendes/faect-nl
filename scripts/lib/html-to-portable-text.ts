/**
 * Convert HTML content to Sanity Portable Text blocks
 * This is a simplified converter for common HTML elements
 */

interface PortableTextBlock {
  _type: 'block'
  _key: string
  style: string
  children: PortableTextSpan[]
  markDefs?: MarkDef[]
}

interface PortableTextSpan {
  _type: 'span'
  _key: string
  text: string
  marks?: string[]
}

interface MarkDef {
  _type: string
  _key: string
  href?: string
}

function generateKey(): string {
  return Math.random().toString(36).substring(2, 10)
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

function parseInlineElements(
  html: string
): {children: PortableTextSpan[]; markDefs: MarkDef[]} {
  const children: PortableTextSpan[] = []
  const markDefs: MarkDef[] = []

  // Very simplified parsing - in production you'd use a proper HTML parser
  // This handles basic text, links, bold, and italic

  // Remove HTML tags but track links
  const linkRegex = /<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi
  let text = html

  // Extract links first
  const links: {placeholder: string; href: string; text: string}[] = []
  text = text.replace(linkRegex, (match, href, linkText) => {
    const placeholder = `__LINK_${links.length}__`
    links.push({placeholder, href, text: stripHtml(linkText)})
    return placeholder
  })

  // Strip remaining HTML
  text = stripHtml(text)

  // If no links, return simple text
  if (links.length === 0) {
    children.push({
      _type: 'span',
      _key: generateKey(),
      text: text,
      marks: [],
    })
  } else {
    // Split by link placeholders and rebuild
    let remaining = text
    for (const link of links) {
      const parts = remaining.split(link.placeholder)
      if (parts[0]) {
        children.push({
          _type: 'span',
          _key: generateKey(),
          text: parts[0],
          marks: [],
        })
      }

      const markKey = generateKey()
      markDefs.push({
        _type: 'link',
        _key: markKey,
        href: link.href,
      })

      children.push({
        _type: 'span',
        _key: generateKey(),
        text: link.text,
        marks: [markKey],
      })

      remaining = parts.slice(1).join(link.placeholder)
    }

    if (remaining) {
      children.push({
        _type: 'span',
        _key: generateKey(),
        text: remaining,
        marks: [],
      })
    }
  }

  return {children, markDefs}
}

export function htmlToPortableText(html: string): PortableTextBlock[] {
  if (!html) return []

  const blocks: PortableTextBlock[] = []

  // Normalize whitespace and clean up
  let content = html
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  // Split by block-level elements
  const blockRegex =
    /<(h[1-6]|p|ul|ol|li|blockquote|div)[^>]*>([\s\S]*?)<\/\1>/gi

  // Simple approach: split by paragraphs and headers
  const elements = content.split(/<\/(?:p|h[1-6]|div|li)>/i)

  for (const element of elements) {
    const trimmed = element.trim()
    if (!trimmed) continue

    // Determine block style
    let style = 'normal'
    let text = trimmed

    if (trimmed.match(/<h1[^>]*>/i)) {
      style = 'h1'
      text = trimmed.replace(/<h1[^>]*>/i, '')
    } else if (trimmed.match(/<h2[^>]*>/i)) {
      style = 'h2'
      text = trimmed.replace(/<h2[^>]*>/i, '')
    } else if (trimmed.match(/<h3[^>]*>/i)) {
      style = 'h3'
      text = trimmed.replace(/<h3[^>]*>/i, '')
    } else if (trimmed.match(/<h4[^>]*>/i)) {
      style = 'h4'
      text = trimmed.replace(/<h4[^>]*>/i, '')
    } else if (trimmed.match(/<p[^>]*>/i)) {
      style = 'normal'
      text = trimmed.replace(/<p[^>]*>/i, '')
    } else if (trimmed.match(/<li[^>]*>/i)) {
      style = 'normal' // Would need list context for proper handling
      text = trimmed.replace(/<li[^>]*>/i, '')
    }

    // Strip any remaining opening tags
    text = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

    if (!text) continue

    const {children, markDefs} = parseInlineElements(text)

    blocks.push({
      _type: 'block',
      _key: generateKey(),
      style,
      children,
      markDefs: markDefs.length > 0 ? markDefs : undefined,
    })
  }

  // If no blocks were created, create a simple one from stripped content
  if (blocks.length === 0 && content) {
    const plainText = stripHtml(content)
    if (plainText) {
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: generateKey(),
            text: plainText,
            marks: [],
          },
        ],
      })
    }
  }

  return blocks
}

export function textToPortableText(text: string): PortableTextBlock[] {
  if (!text) return []

  const paragraphs = text.split(/\n\n+/)

  return paragraphs
    .filter((p) => p.trim())
    .map((paragraph) => ({
      _type: 'block' as const,
      _key: generateKey(),
      style: 'normal' as const,
      children: [
        {
          _type: 'span' as const,
          _key: generateKey(),
          text: paragraph.trim(),
          marks: [],
        },
      ],
    }))
}
