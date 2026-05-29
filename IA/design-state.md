# Design State: Portfolio Killian Gauchet

_Last updated: 2026-05-29 by design-builder_

## Brief
- **Problem:** Créer un portfolio immersif BUT Informatique haut de gamme.
- **Primary persona:** Recruteurs Tech & Responsables de formation.
- **Success metric:** Fidélité visuelle 1:1 et fluidité 60fps (Framer Motion).
- **Brief document:** IA/brief.md

## Personas
- **Recruteur Tech** — cherche efficacité et preuve de talent.
- **Responsable BUT** — vérifie les compétences académiques.

## Design Principles
1. **Immersion Organique** — Les interactions doivent sembler vivantes et fluides.
2. **Contraste de Lisibilité** — Le visuel ne doit jamais nuire à la clarté.
3. **Intelligence Temporelle** — Le site s'adapte dynamiquement au parcours de Killian.

## Taste Profile
- **Emotional target:** "Futuristic Confidence", "Technical Elegance"
- **Quality level:** Production/Flagship
- **Key references:** Mercury-like shapes, Glassmorphism, Neon accents.
- **Aesthetic principles:** Deep dark backgrounds, frosted glass, vibrant accents.

## Decisions Log
| Date | Agent | Decision | Rationale |
|------|-------|----------|-----------|
| 2026-05-29 | orchestrator | Utilisation de Framer Motion | Améliorer la fluidité et l'aspect "premium" demandé par l'utilisateur. |
| 2026-05-29 | orchestrator | Fichier unique React | Respect de la contrainte initiale du prompt. |
| 2026-05-29 | design-strategist | Stratégie "Intelligence Temporelle" | Automatiser l'affichage selon la progression réelle de l'étudiant. |
| 2026-05-29 | design-lead | Palette "Deep Space Iridescent" | Fond dégradé radial (#0a0f2e) pour maximiser la profondeur du verre. |
| 2026-05-29 | design-lead | Typo Syne (800) / DM Sans (300) | Contraste fort entre titres brutaux et corps de texte léger. |
| 2026-05-29 | motion-designer | Physique de "Liquide Intelligent" | Utilisation de Framer Motion `spring` pour les blobs et le curseur. |
| 2026-05-29 | design-builder | Implémentation Vite/React + TS | Structure robuste pour Framer Motion et Lucide Icons. |

## Open Questions
- [x] Choix exact des icônes SVG pour les technos et rubriques. (Utilisation de Lucide React).

## Artefact Index
| Artefact | Path | Status |
|----------|------|--------|
| Brief | IA/brief.md | Approved |
| Stratégie | IA/strategy.md | Complete |
| Plan | IA/implementation-plan.md | Complete |
| Portfolio Code | src/App.tsx | Built |

## Design Debt Register
_Items: 0 | Critical: 0 | Oldest: —_

## Handoff Chain
### 2026-05-29 orchestrator → design-strategist
> "Le brief est validé. L'utilisateur a autorisé l'usage de Framer Motion pour garantir une fluidité maximale. La DA est très précise (futuristic glassmorphism). À toi de définir l'architecture du composant et la stratégie d'interaction avant de passer au visuel."

### 2026-05-29 design-strategist → design-lead
> "La stratégie est posée : 'Immersion Organique'. On mise sur Framer Motion pour donner vie aux blobs et au glassmorphism. Le point crucial est l'adaptation dynamique à l'année d'étude de Killian. À toi de traduire ça en choix visuels précis (couleurs de badges, intensité des glows, variantes de blobs)."

### 2026-05-29 design-lead → design-builder
> "Visuel et mouvement sont alignés. On part sur un layout en 12 colonnes avec beaucoup d'espace vide. Utilise Framer Motion pour : 1. Les blobs organiques en arrière-plan. 2. Le curseur 'spring'. 3. Les entrées de sections. N'oublie pas le `backdrop-filter` sur toutes les cartes pour l'effet givré. C'est à toi de monter le prototype React."

### 2026-05-29 design-builder → orchestrator
> "Le portfolio est entièrement construit dans `src/App.tsx`. Toutes les sections (Hero, Stats, Projets, À propos, Compétences, Disponibilités, Contact) sont fonctionnelles et respectent la DA. Framer Motion gère les blobs, le curseur et les transitions de sections. Le projet est prêt à être lancé via `npm run dev`."
