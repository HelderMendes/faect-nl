import {StructureBuilder} from 'sanity/structure'
import {
  DocumentIcon,
  FolderIcon,
  HomeIcon,
  CaseIcon,
  CogIcon,
  ComposeIcon,
  UsersIcon,
  StarIcon,
} from '@sanity/icons'

const pageFolder = (S: StructureBuilder, title: string, folder: string, icon = FolderIcon) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.documentList()
        .title(title)
        .filter('_type == "page" && pageFolder == $folder')
        .params({folder})
        .defaultOrdering([{field: 'title', direction: 'asc'}])
    )

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Inhoud')
    .items([
      // ── Pages ──────────────────────────────────────────────
      S.listItem()
        .title('Pagina\'s')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Pagina\'s')
            .items([
              S.listItem()
                .title('Alle pagina\'s')
                .icon(FolderIcon)
                .child(
                  S.documentList()
                    .title('Alle pagina\'s')
                    .filter('_type == "page"')
                    .defaultOrdering([{field: 'title', direction: 'asc'}])
                ),
              S.divider(),
              pageFolder(S, "Hoofdpagina's", 'main', HomeIcon),
              pageFolder(S, 'Microsoft Dynamics 365', 'dynamics', CogIcon),
              pageFolder(S, 'Regels', 'regels', DocumentIcon),
            ])
        ),

      // ── Vacatures ──────────────────────────────────────────
      S.listItem()
        .title('Vacatures')
        .icon(CaseIcon)
        .child(
          S.list()
            .title('Vacatures')
            .items([
              S.listItem()
                .title('Vacaturepagina')
                .icon(DocumentIcon)
                .child(
                  S.documentList()
                    .title('Vacaturepagina')
                    .filter('_type == "page" && pageFolder == "vacatures"')
                ),
              S.divider(),
              S.listItem()
                .title('Individuele vacatures')
                .icon(CaseIcon)
                .child(
                  S.documentList()
                    .title('Individuele vacatures')
                    .filter('_type == "vacature"')
                    .defaultOrdering([{field: 'title', direction: 'asc'}])
                ),
            ])
        ),

      S.divider(),

      // ── Content collections ────────────────────────────────
      S.listItem()
        .title('Nieuws & Blog')
        .icon(ComposeIcon)
        .child(S.documentList().title('Nieuws & Blog').filter('_type == "post"')),

      S.listItem()
        .title('Klanten & Cases')
        .icon(StarIcon)
        .child(S.documentList().title('Klanten & Cases').filter('_type == "caseStudy"')),

      S.listItem()
        .title('Team')
        .icon(UsersIcon)
        .child(S.documentList().title('Teamleden').filter('_type == "teamMember"')),

      S.listItem()
        .title('Partners')
        .icon(FolderIcon)
        .child(S.documentList().title('Partners').filter('_type == "partner"')),

      S.divider(),

      // ── Settings ───────────────────────────────────────────
      S.listItem()
        .title('Site-instellingen')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
    ])
