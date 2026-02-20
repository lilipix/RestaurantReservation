# RestaurantReservation

# Membre de l'equipe
  - Aurelie DEMERE
  - Franck joel NZOKOU
  - Dina CHAOUKI
  - Cécile-Audrée Deumeni

# Description du projet

RestaurantReservation est une application full‑stack (API Node/Express + MongoDB + frontend Next.js) destinée à gérer des restaurants, leurs menus et les réservations clients. Ce dépôt sert de prototype complet prêt à l'emploi pour une petite plateforme de réservation : démo, développement et base pour production.

## But du projet

- Fournir une API simple et testable pour gérer restaurants et réservations.
- Offrir un frontend Next.js minimal pour naviguer, consulter et créer des réservations.
- Montrer des bonnes pratiques : validation (Zod), architecture services/routers, types front, scripts d'import, et déploiement local avec Docker.

## Spécialités techniques

- Validation stricte côté serveur avec **Zod** (schémas réutilisables, validation des ObjectId, messages d'erreur structurés).
- Modèles Mongoose clairs pour les entités (`Restaurant`, `Reservation`, `User`).
- Frontend Next.js + Tailwind pour une UI simple et réactive.
- Services front centralisés (`RestaurantService`, `ReservationService`, `UserService`) pour découpler les appels HTTP.
- Script d'import de données (`importRestaurants.js`) pour précharger un dataset de démo.
- Déploiement local simplifié via `docker-compose` pour MongoDB + mongo-express.

## Architecture (aperçu)

- Backend (Express + Mongoose)
   - Entrée : `express_back/server.js`
   - Routes : `express_back/src/routes/restaurant.routes.js`
   - Modèles : `express_back/src/model/restaurant.model.js`
   - Validators (Zod) : `express_back/src/validators/*.js`
   - Utilitaires : `express_back/src/utils/apiResponse.js`

- Frontend (Next.js)
   - Pages : `frontend/app/` (accueil, restaurants, détails, réservations, users)
   - Services : `frontend/app/lib/*.service.ts`
   - Types partagés : `frontend/app/types/index.ts`

- Base de données
   - Docker Compose : `mongodb/docker-compose.yml`

## Prérequis

- Node.js (>=16/18 recommandé)
- npm
- Docker & docker-compose (optionnel, pour DB)

## Variables d'environnement (exemple)

Créez `express_back/.env` à partir de `express_back/.env.sample` puis adaptez :

```
MONGO_USER=mongo_user
MONGO_PASSWORD=example1234
MONGO_INIT_DB=restaurantdb
MONGO_HOST=localhost
MONGO_PORT=27017
PORT=5000
EXPRESS_HOST=0.0.0.0
```

Note : en Docker le `MONGO_HOST` pour d'autres conteneurs est `mongodb` (nom du service dans `docker-compose`).

## Démarrage rapide (local)

1) Lancer la base (si vous avez MongoDB local ou Docker)

Option Docker (recommandée pour tester rapidement) :

```bash
cd mongodb
docker-compose up -d
```

2) Backend

```bash
cd express_back
npm install
cp .env.sample .env   # adapter .env
node server.js
```

3) Importer les données de démo (optionnel)

```bash
cd express_back
node importRestaurants.js
```

4) Frontend

```bash
cd frontend
npm install
npm run dev
```

Le frontend démarre par défaut sur `http://localhost:3000` et le backend sur le `PORT` défini (ex: `5000`).


## Pourquoi Zod ?

Zod fournit :

- Des schémas simples et réutilisables.
- Une validation cohérente côté serveur qui renvoie des erreurs claires pour le frontend.
- Une facilité d'extension et de test unitaire.

Les fichiers de validation se trouvent dans `express_back/src/validators/`.

## Importer le dataset

Le script `express_back/importRestaurants.js` vide et recharge la collection `restaurants` à partir de `express_back/dataset/restaurants.json`.

```bash
cd express_back
node importRestaurants.js
```

## Développement et contributions

- Frontend : ajouter/éditer les pages dans `frontend/app/` et les services dans `frontend/app/lib/`.
- Backend : ajouter routes ou validators dans `express_back/src/`.
- Tests : ajouter des tests unitaires pour les validators Zod et la logique métier.

Bonnes pratiques:

- Utiliser les services front pour centraliser les appels HTTP.
- Valider les données côté serveur (Zod) et côté client si besoin.
- Synchroniser `MONGO_HOST` entre `.env` et `docker-compose` selon votre mode d'exécution.

## Fichiers clés

- Backend : `express_back/server.js`
- Routes : `express_back/src/routes/restaurant.routes.js`
- Modèle : `express_back/src/model/restaurant.model.js`
- Validators : `express_back/src/validators/*.js`
- Import : `express_back/importRestaurants.js`
- Frontend : `frontend/app/` et `frontend/app/lib/*.service.ts`
- Docker : `mongodb/docker-compose.yml`

