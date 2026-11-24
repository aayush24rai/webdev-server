# webdev-server

Express HTTP server for Kambaz (CS5610, Chapter 5). In-memory data; MongoDB arrives in Chapter 6.

## Run locally

```bash
npm install
npm run dev      # nodemon + tsx on http://localhost:4000
```

Create a `.env` file (not committed):

```
SERVER_ENV=development
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:4000
SESSION_SECRET=any local phrase
```

## Layout

- `index.ts` creates the one Express app, then CORS, session, JSON body parsing, then routes
- `Hello.ts` `/` and `/hello`
- `Lab5/` path params, query params, remote object, remote array exercises
- `Kambaz/Database` JSON seed data plus barrel `index.ts`
- `Kambaz/<Collection>/dao.ts` data access (only file that touches the arrays)
- `Kambaz/<Collection>/routes.ts` HTTP layer (parses req, calls DAO, sends res)

## Kambaz API

| Method | Path | Purpose |
|---|---|---|
| POST | /api/users/signin, /signup, /signout | account actions, session cookie |
| GET | /api/users/profile | current session user or 401 |
| PUT | /api/users/:userId | update profile |
| GET | /api/courses | all courses |
| GET | /api/users/:userId/courses | enrolled courses (`current` = session user) |
| POST | /api/users/current/courses | create course + enroll creator |
| PUT / DELETE | /api/courses/:courseId | update / delete course |
| GET / POST | /api/courses/:courseId/modules | list / create modules |
| PUT / DELETE | /api/modules/:moduleId | update / delete module |
| GET / POST | /api/courses/:courseId/assignments | list / create assignments |
| GET / PUT / DELETE | /api/assignments/:assignmentId | read / update / delete assignment |
| POST / DELETE | /api/users/:userId/courses/:courseId | enroll / unenroll |
