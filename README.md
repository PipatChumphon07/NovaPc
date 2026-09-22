# Port-able Tracks deployment

This repository deploys as one Vercel project:

- `client/` is built by Vite into the static site at `client/dist`.
- Every `/api/*` request is rewritten to the one Express Vercel Function, `api/index.js`.
- MongoDB Atlas is connected lazily and its connection is reused by warm function instances.
- Authenticated image uploads go to Vercel Blob through `POST /api/uploads/image`.

## Vercel setup

Import the repository with its root directory set to this folder. Vercel detects `vercel.json`; leave the build command and output directory as configured.

In the Vercel project, create these environment variables for Production, Preview, and Development as appropriate:

| Variable | Purpose |
| --- | --- |
| `MONGO_URI` | MongoDB Atlas connection string. Include the database name. |
| `JWT_SECRET` | Long, random secret used to sign sessions. |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob read/write token. Create a Blob store and connect it to this project to populate it automatically. |
| `CLIENT_ORIGIN` | Optional custom frontend origin for cross-origin API calls. Omit when frontend and API share this project. |

For Atlas, add an appropriate database user and allow Vercel's outbound network access using Atlas Network Access. During initial setup, a temporary `0.0.0.0/0` entry is common; restrict it when your networking approach permits.

## Image upload API

Send a raw image body (maximum 4 MiB) after authenticating:

```http
POST /api/uploads/image
Authorization: Bearer <JWT>
Content-Type: image/webp
```

The response contains the public Blob `url`, which can be stored in a product's `image` field.

## Local development

Create `server/.env` with `MONGO_URI` and `JWT_SECRET`, then run `npm run dev`. The client proxy remains available through `npm --prefix client run dev`.
