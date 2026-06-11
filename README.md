# ProActif — Site vitrine

Site vitrine one-page pour ProActif (coaching sportif en entreprise), conçu dans
Claude Design puis implémenté ici.

## Contenu

- `index.html` — le site complet, autonome (CSS + JS inline, aucune dépendance backend)
- `assets/` — logo, visuel hero, photo de la section "L'approche"

## Lancer le site

Ouvre simplement `index.html` dans un navigateur (double-clic). Aucune
installation requise. Les polices (Spectral + Libre Franklin) sont chargées via
Google Fonts, donc une connexion internet est nécessaire au premier affichage.

## Sections

Header ancré · Hero · Le constat (chiffré) · L'approche · Bénéfices ·
Comment ça marche (4 étapes) · Nos solutions (4 cartes) · FAQ ·
CTA + formulaire de contact · Footer.

## À personnaliser avant publication

- **Coordonnées** : email `contact@proactifcoaching.fr` (footer). Téléphone
  retiré du site à la demande de Quentin (non publié).
- **Chiffres du "constat"** (4 000 €, 87 %, 7 h) : ordres de grandeur d'études de
  référence, à vérifier et sourcer avant publication.
- **Mentions légales / Politique de confidentialité** : liens vides à compléter (footer).
- **Formulaire** : actif. Branché sur Web3Forms (sans serveur), les demandes arrivent
  sur `contact@proactifcoaching.fr`. Protection anti-spam par honeypot (champ piège
  `botcheck` invisible). Pour changer l'adresse de réception : générer une nouvelle clé
  sur web3forms.com et remplacer `WEB3FORMS_KEY` dans `index.html`.
- **Mentions légales** : page encore à créer. Il manque la raison sociale, le SIRET et
  l'adresse postale (voir l'encadré "À compléter" dans `confidentialite.html`).
- **Politique de confidentialité** : page `confidentialite.html` créée et liée depuis le
  footer. À finaliser avec les infos légales manquantes.
- **Polices** : Spectral et Libre Franklin sont hébergées en local dans `fonts/`
  (plus d'appel à Google Fonts), pour la conformité RGPD. La feuille `fonts/fonts.css`
  est chargée par les pages du site.
- **Témoignages** : section volontairement retirée tant qu'il n'y a pas de clients.

## Évolutions possibles

- Connecter le formulaire (Formspree, email, Calendly...)
- Réintégrer une section témoignages quand les premiers retours clients arrivent
