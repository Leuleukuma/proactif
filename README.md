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

- **Coordonnées** : l'email `contact@proactif.fr` est fictif. Le téléphone
  `06 78 32 13 80` provient de ton visuel, à confirmer. (Footer)
- **Chiffres du "constat"** (4 000 €, 87 %, 7 h) : ordres de grandeur d'études de
  référence, à vérifier et sourcer avant publication.
- **Mentions légales / Politique de confidentialité** : liens vides à compléter (footer).
- **Formulaire** : branché sur Web3Forms (envoi par email, sans serveur). Il reste
  UNE étape pour l'activer : va sur https://web3forms.com, entre ton email pro, copie
  l'"access key" reçue, et colle-la dans `index.html` à la place de
  `COLLE_TA_CLE_ICI` (cherche `WEB3FORMS_KEY` dans le fichier). Tant que la clé n'est
  pas renseignée, l'envoi affichera un message d'erreur. Offre gratuite : 250 envois/mois.
- **Témoignages** : section volontairement retirée tant qu'il n'y a pas de clients.

## Évolutions possibles

- Connecter le formulaire (Formspree, email, Calendly...)
- Réintégrer une section témoignages quand les premiers retours clients arrivent
