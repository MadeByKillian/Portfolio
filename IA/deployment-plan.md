# GitHub Pages Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Configurer le déploiement automatique du portfolio sur GitHub Pages en utilisant `gh-pages`.

**Architecture:** Ajout de scripts npm pour automatiser le build et le push du dossier de sortie (`dist`) vers la branche `gh-pages`. Configuration de la base URL dans Vite pour assurer le chargement correct des assets sur GitHub Pages.

**Tech Stack:** Vite, gh-pages, npm.

---

### Task 1: Vite Configuration for GitHub Pages

**Files:**
- Modify: `vite.config.ts`

- [ ] **Step 1: Ajouter la propriété `base` dans `vite.config.ts`**
  Pour que les chemins des fichiers (JS, CSS) soient corrects sur `username.github.io/repo-name/`, il faut définir la base.

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Utilise des chemins relatifs pour fonctionner partout
})
```

- [ ] **Step 2: Vérifier la configuration**
  Vérifier que le fichier est syntaxiquement correct.

---

### Task 2: NPM Deployment Scripts

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Ajouter les scripts `predeploy` et `deploy`**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist -b gh-pages"
  }
}
```

- [ ] **Step 2: Vérifier le fichier `package.json`**
  S'assurer que les virgules et la structure JSON sont respectées.

---

### Task 3: Final Verification & Commit

**Files:**
- Modify: `.gitignore` (optionnel, vérifier si `dist` est ignoré)

- [ ] **Step 1: Vérifier le .gitignore**
  S'assurer que le dossier `dist` n'est pas commité sur la branche principale mais bien ignoré localement pour éviter les conflits.

- [ ] **Step 2: Commit les changements**

```bash
git add vite.config.ts package.json
git commit -m "chore: configure github pages deployment with gh-pages"
```
