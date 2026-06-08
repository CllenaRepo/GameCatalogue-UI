## Project Structure

```
GameCatalogue-UI/           # Angular 22 SPA      
└── src/app/
    ├── models/             # game.model.ts
    ├── services/           # game.service.ts (HttpClient wrapper)
    └── pages/
        ├── browse/         # Game list table with delete modal
        └── edit/           # Create / edit form with validation
```

## Prerequisites

| Tool | Version |
|------|---------|
| Angular CLI | `npm install -g @angular/cli` |

---


## Front End server

To start a local development server, run:

```bash
cd game-catalogue-ui
npm install
ng serve
# App opens at http://localhost:4200
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.
NOTE: You may need to change the localhost server in game.service.ts .
