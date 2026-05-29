# Design Plan: Portfolio Killian Gauchet (React + Framer Motion)

> **For agentic workers:** REQUIRED: Use designpowers:designpowers-critique to review completed work against this plan.

**Goal:** Créer un portfolio immersif, fluide et dynamique en un seul fichier React, respectant la DA Glassmorphism et intégrant Framer Motion.

**Design Direction:** IA/brief.md et IA/strategy.md
**Personas:** IA/design-state.md

---

## Task 1: Foundation & Global Styles

**Files:** `src/App.tsx`

- [x] Step 1: Injecter les Google Fonts (Syne, DM Sans) via un tag `<style>`.
- [x] Step 2: Définir les variables CSS et les keyframes globales (twinkle, float, morph).
- [x] Step 3: Mettre en place la structure de base du composant (états, calculs dynamiques de l'année).

---

## Task 2: Background Elements & Navigation

**Files:** `src/App.tsx`

- [x] Step 1: Créer le système de particules (étoiles) optimisé via `useMemo`.
- [x] Step 2: Implémenter les Blobs organiques animés avec Framer Motion en arrière-plan.
- [x] Step 3: Développer la barre de navigation Glassmorphism avec le logo "KG" et le menu mobile.

---

## Task 3: Hero Section & Stats

**Files:** `src/App.tsx`

- [x] Step 1: Layout Hero en 2 colonnes avec titres animés (Framer Motion `initial/animate`).
- [x] Step 2: Texte dynamique du sous-titre selon `yearData`.
- [x] Step 3: Section Stats avec cartes glassmorphism et compteurs de chiffres.

---

## Task 4: Projects & About

**Files:** `src/App.tsx`

- [x] Step 1: Système de filtrage des projets par tag avec transitions Framer Motion (layout animations).
- [x] Step 2: Cartes projets avec effet de survol (lift + glow) et badges semestres.
- [x] Step 3: Section "À propos" avec contenu textuel variant selon l'année d'étude.

---

## Task 5: Skills, Availability & Contact

**Files:** `src/App.tsx`

- [x] Step 1: Barres de compétences animées au scroll (Intersection Observer ou `whileInView`).
- [x] Step 2: Section "Disponibilités" dynamique (Stage/Alternance) avec badges pulsants.
- [x] Step 3: Formulaire de contact glassmorphism avec validation visuelle des inputs.

---

## Task 6: Polish & Final Interactions

**Files:** `src/App.tsx`

- [x] Step 1: Implémenter le curseur personnalisé avec `useSpring` pour un suivi fluide.
- [x] Step 2: Ajouter les transitions de sections fluides et le scroll-spy pour la navigation.
- [x] Step 3: Finaliser le Footer et le responsive mobile global.
