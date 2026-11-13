# ASM

> Application web Angular de gestion des employés, des statuts et des demandes de pause.

[![Angular](https://img.shields.io/badge/Angular-16.2-DD0031?logo=angular)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

## Sommaire

- [Présentation](#présentation)
- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Exécution](#exécution)
- [Configuration de l'API](#configuration-de-lapi)
- [Vérifications](#vérifications)

## Présentation

ASM est une application de gestion interne destinée à suivre les employés et leurs demandes de pause. Elle propose une interface distincte pour les administrateurs et les employés, avec une authentification par token JWT et une communication avec une API REST.

L'interface est construite avec Angular et Tailwind CSS. Les notifications, les formulaires et les sélecteurs de dates sont intégrés dans les écrans de connexion, de gestion et de suivi des demandes.

## Fonctionnalités

- Inscription et connexion des utilisateurs.
- Gestion de session avec token JWT stocké localement.
- Redirection selon le rôle de l'utilisateur.
- Gestion CRUD des statuts de pause.
- Création, modification, suppression et consultation des demandes de pause.
- Suivi de la durée des pauses par jour et par mois.
- Gestion et recherche des employés avec pagination.
- Navigation adaptée aux administrateurs et aux employés.
- Profil utilisateur et déconnexion.
- Notifications avec `ngx-toastr`.
- Sélection de dates avec `flatpickr`.
- Interface stylée avec Tailwind CSS et Font Awesome.

## Stack technique

| Domaine | Technologies |
| --- | --- |
| Interface | Angular 16, TypeScript |
| Styles | Tailwind CSS, CSS |
| Formulaires | Angular Forms, Reactive Forms |
| Navigation | Angular Router |
| Communication | Angular HttpClient, RxJS |
| Authentification | API REST, JWT |
| Notifications | ngx-toastr |
| Dates | flatpickr |
| Backend attendu | API REST accessible sur `http://127.0.0.1:8000/api` |


```

Le code applicatif est organisé par responsabilité :

```text
src/
├── app/
│   ├── login/             # Connexion
│   ├── register/          # Inscription
│   ├── statuts/           # Gestion des statuts
│   ├── demandes/         # Gestion des demandes de pause
│   ├── employees/        # Gestion des employés
│   ├── dashboard-*/      # Tableaux de bord par rôle
│   ├── *-header/         # En-têtes administrateur et employé
│   ├── pagination/       # Pagination réutilisable
│   ├── pipes/            # Filtres de recherche
│   └── app-routing.module.ts
├── services/
│   ├── auth-service.service.ts
│   ├── demande-service.service.ts
│   └── statut.service.ts
├── assets/images/        # Logos et images de l'interface
├── styles.css            # Styles globaux et Tailwind
└── main.ts               # Point d'entrée
```

## Prérequis

- Node.js et npm.
- Angular CLI compatible avec Angular `16.2.14`.
- Une API backend disponible sur `http://127.0.0.1:8000`.

## Installation

```bash
git clone https://github.com/AichaAbdennadher/ASM.git
cd ASM
npm install
```

## Exécution

Démarrer le serveur de développement :

```bash
npm start
```

Puis ouvrir [http://localhost:4200](http://localhost:4200).

L'application redémarre automatiquement après les modifications des fichiers source.

## Configuration de l'API

Les services Angular utilisent actuellement les endpoints suivants :

```text
http://127.0.0.1:8000/api/login
http://127.0.0.1:8000/api/register
http://127.0.0.1:8000/api/logout
http://127.0.0.1:8000/api/users
http://127.0.0.1:8000/api/statuts
http://127.0.0.1:8000/api/demandes
```

Le token de connexion et les informations de l'utilisateur sont conservés dans le `localStorage`. Le backend doit donc être démarré avant les opérations nécessitant une API.

## Vérifications

Construire l'application :

```bash
npm run build
```

Lancer les tests unitaires :

```bash
npm test
```

Pour générer un build de développement en mode surveillance :

```bash
npm run watch
```
