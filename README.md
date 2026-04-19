# Site BLS — Bonnebouche Plâtrerie & Peinture

## 🚀 Déploiement sur Vercel (gratuit)

### Étape 1 — Mettre le code sur GitHub
1. Créer un compte GitHub sur https://github.com si pas encore fait
2. Créer un nouveau repo : cliquer sur "New repository"
3. Nommer le repo : `bls-site`
4. Laisser en **Public** et cliquer "Create repository"
5. Télécharger GitHub Desktop : https://desktop.github.com
6. Cloner le repo vide sur ton ordi
7. **Copier tous les fichiers de ce dossier dans le repo cloné**
8. Dans GitHub Desktop : écrire "Initial commit" → Commit → Push

### Étape 2 — Déployer sur Vercel
1. Aller sur https://vercel.com et créer un compte (avec ton GitHub)
2. Cliquer "Add New Project"
3. Importer le repo `bls-site`
4. Framework : **Vite** (détecté automatiquement)
5. Cliquer **Deploy** → C'est fait ! 🎉

L'URL sera : `bls-site.vercel.app` (ou personnalisable)

### Étape 3 — Configurer Formspree (formulaire de contact)
1. Aller sur https://formspree.io et créer un compte gratuit
2. Créer un nouveau formulaire → copier l'ID (ex: `xeqbzklp`)
3. Dans `src/App.jsx`, ligne ~230, remplacer :
   ```
   https://formspree.io/f/YOUR_FORM_ID
   ```
   par :
   ```
   https://formspree.io/f/xeqbzklp
   ```
4. Refaire un commit + push → Vercel redéploie automatiquement

## 📱 Contacts du site
- **Tél** : 06 11 02 48 33
- **WhatsApp** : https://wa.me/33611024833
- **Adresse** : 1 All. de la Divinières, 38780 Estrablin
