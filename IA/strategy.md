# Design Strategy: Portfolio Killian Gauchet

## Design Principles

### 1. Immersion Organique
**Le principe :** Les interactions doivent sembler vivantes et fluides, évitant toute rigidité mécanique.
**En pratique :** Utilisation de Framer Motion pour des transitions "spring" et des blobs dont la forme évolue naturellement.
**Ce que nous ne ferons pas :** Des animations linéaires ou saccadées qui briseraient l'illusion de "liquide iris頻".

### 2. Contraste de Lisibilité
**Le principe :** La complexité visuelle du Glassmorphism ne doit jamais compromettre la clarté de l'information technique.
**En pratique :** Utilisation de flous d'arrière-plan (backdrop-filter) puissants et de typographies à fort contraste (blanc pur sur fond nuit).
**Ce que nous ne ferons pas :** Superposer du texte fin sur des zones trop chargées ou lumineuses sans protection visuelle.

### 3. Intelligence Temporelle
**Le principe :** Le site n'est pas statique ; il "connaît" le parcours de Killian en temps réel.
**En pratique :** Calcul dynamique automatique des stats, des projets visibles et des badges de disponibilité selon l'année actuelle.
**Ce que nous ne ferons pas :** Afficher des informations obsolètes ou demander une mise à jour manuelle des dates clés.

## Positionnement
Le portfolio se distingue par sa capacité à combiner une esthétique "Dribbble" (souvent jugée impossible à coder proprement) avec une structure React solide, sémantique et performante (zéro librairie UI lourde, focus sur le sur-mesure).

## Expérience Utilisateur (Experience Map)
1. **L'Entrée (0-5s) :** Effet "Wow" immédiat avec le blob central et les étoiles. Killian est identifié comme un étudiant en BUT Info de [X]ème année.
2. **La Preuve (Scroll) :** Les chiffres clés et les projets valident instantanément le niveau technique. Les filtres permettent une exploration rapide.
3. **La Connexion :** La section "Disponibilités" personnalisée selon l'année (stage/alternance) crée un appel à l'action direct et pertinent pour le recruteur.
4. **La Sortie :** Formulaire de contact intégré ou réseaux sociaux, avec un sentiment de professionnalisme moderne.

## Métriques de Succès
| Métrique | Mesure | Cible |
|----------|--------|-------|
| Fluidité | Frame rate | 60 FPS constant |
| Accessibilité | Score Lighthouse | > 90 |
| Temps de chargement | FCP (First Contentful Paint) | < 1.2s |

## Contraintes et Compromis
Nous optimisons pour le **visuel et l'interactivité** au détriment de la légèreté absolue du bundle (l'ajout de Framer Motion est un choix délibéré pour la qualité perçue).
