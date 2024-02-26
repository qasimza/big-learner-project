# Big Learner Project

## Overview
Mono-repo Containing Backend and Frontend Code for Learner Project. Involves 


## Repo Structure 
```bash
.
├── backend              # Repository containing server-side Go-lang scripts
│   ├── db
│   │   └── db.go
│   ├── go.mod
│   ├── go.sum
│   ├── main.go
│   └── restapi
│       └── restapi.go
├── frontend            # Repository containing client side SolidJS Application
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── pnpm-lock.yaml
│   ├── postcss.config.js
│   ├── README.md
│   ├── src
│   │   ├── App.module.css
│   │   ├── App.tsx
│   │   ├── assets
│   │   │   └── favicon.ico
│   │   ├── components
│   │   │   ├── clientApi.tsx
│   │   │   ├── ReservationCountCards.tsx
│   │   │   └── Table.tsx
│   │   ├── index.css
│   │   ├── index.tsx
│   │   └── logo.svg
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
└── README.md

```