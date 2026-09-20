# DKZ Solar ⚡

Exportation et vente de panneaux solaires en République de Guinée — site web vitrine + catalogue, et application Android native.

## Structure

```
dkz-solar/
├── web/        → Site vitrine (Vite + React, design type Tesla)
├── android/    → Application Android (Java natif, Gradle)
└── README.md
```

---

## 🌐 Site web (`web/`)

Stack : **Vite + React** (SPA), design sombre type Tesla : hero plein écran, animations au scroll, marquee, catalogue produit, pages détail, formulaire de devis, FAQ, contact.

### Dev

```bash
cd dkz-solar/web
npm install
npm run dev            # http://localhost:5173
```

### Build / déploiement

```bash
npm run build          # → dossier dist/
```

Le site est **100% statique** : déposez `dist/` sur n'importe quel hébergeur
(Netlify, Vercel, GitHub Pages, OVH, cPanel…). Le chemin de base est relatif (`base: './'`),
il fonctionne donc aussi dans un sous-dossier.

### Personnaliser les coordonnées

- Téléphone / WhatsApp : `web/src/components/Ticker.jsx`, `QuoteForm.jsx`, `Footer.jsx`
- Email de réception des devis : `web/src/components/QuoteForm.jsx`
  (`https://formsubmit.co/ajax/contact@dkzsolar.com`) — gratuit et sans backend.
- Produits et prix : `web/src/data/products.js`

---

## 📱 Application Android (`android/`)

Stack : **Java natif** — Gradle 8.7, AGP 8.4, minSdk 24 (Android 7+), targetSdk 34.

Onglets : Accueil · Catalogue (RecyclerView + pages de détail) · Devis (sauvegarde locale
+ envoi WhatsApp) · Contact (appel / email / carte).

### Compiler l'APK debug

Prérequis : Android SDK (platform 34) + JDK 17 ou 21.

```bash
cd dkz-solar/android
gradlew assembleDebug
# → app/build/outputs/apk/debug/app-debug.apk
```

Ou simplement **Android Studio** → Ouvrir `dkz-solar/android` → Run ▶.

### Installer sur un téléphone

1. Activer « Sources inconnues » dans les réglages Android.
2. Copier `app-debug.apk` sur le téléphone et ouvrir le fichier.
3. Ou `adb install app/build/outputs/apk/debug/app-debug.apk`.

### Générer une APK de production signée

1. `Build → Generate Signed Bundle / APK` dans Android Studio (créer un keystore).
2. ou en CLI : ajouter un `signingConfig` puis `gradlew assembleRelease`.

### Personnaliser l'app

- Numéro WhatsApp / téléphone : `ui/quote/QuoteFragment.java`, `ui/contact/ContactFragment.java`
- Produits du catalogue : `app/src/main/assets/products.json`
- Noms/onglets : `res/values/strings.xml`

---

## Couleurs de marque

| Élément       | Couleur   |
|---------------|-----------|
| Fond          | `#0A0A09` |
| Accent (soleil)| `#EEF800` |
| Texte         | `#80B918` |
| Texte atténué | `#A3A3A3` |