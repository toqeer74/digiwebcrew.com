# PostgreSQL Migration Guide
## MongoDB → PostgreSQL via Prisma 7

---

## 1. Install new dependencies

```bash
npm install prisma @prisma/client @prisma/adapter-pg pg dotenv
npm install --save-dev @types/pg
npm uninstall mongoose mongodb
```

---

## 2. Set your environment variable

In `.env.local` (and Vercel → Project Settings → Environment Variables):

```env
# Remove this:
# MONGODB_URI=mongodb+srv://...

# Add this:
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require
```

**Free PostgreSQL options:**
- **Neon** (recommended) → https://neon.tech — free tier, serverless, Vercel-friendly
- **Supabase** → https://supabase.com — free tier with dashboard
- **Railway** → https://railway.app — easy deploy

---

## 3. Copy files into your project

Replace/create these files (paths relative to project root):

| File in this zip | Destination in your project |
|---|---|
| `prisma/schema.prisma` | `prisma/schema.prisma` ← new file |
| `prisma.config.ts` | `prisma.config.ts` ← new file (project root) |
| `src/lib/db.ts` | `src/lib/db.ts` |
| `src/lib/db-wrapper.ts` | `src/lib/db-wrapper.ts` |
| `src/lib/audit.ts` | `src/lib/audit.ts` |
| `src/lib/branding.ts` | `src/lib/branding.ts` |
| `src/lib/analytics-engine.ts` | `src/lib/analytics-engine.ts` |
| `src/lib/chat-engine.ts` | `src/lib/chat-engine.ts` |
| `src/lib/actions/lead-actions.ts` | `src/lib/actions/lead-actions.ts` |
| `src/lib/actions/dashboard-actions.ts` | `src/lib/actions/dashboard-actions.ts` |
| `src/lib/actions/analytics-actions.ts` | `src/lib/actions/analytics-actions.ts` |
| `src/lib/actions/notification-actions.ts` | `src/lib/actions/notification-actions.ts` |
| `src/lib/actions/quote-actions.ts` | `src/lib/actions/quote-actions.ts` |
| `src/lib/actions/admin-actions.ts` | `src/lib/actions/admin-actions.ts` |
| `src/app/api/admin/settings/tracking/route.ts` | same path |
| `src/app/api/admin/settings/system/route.ts` | same path |
| `src/app/api/admin/settings/status/route.ts` | same path |
| `src/app/api/admin/branding/route.ts` | same path |
| `src/app/api/admin/drafts/route.ts` | same path |
| `src/app/api/admin/drafts/[id]/route.ts` | same path |
| `src/app/api/admin/leads/export/route.ts` | same path |
| `src/app/api/admin/audit/export/route.ts` | same path |
| `src/app/api/ai-chat/start/route.ts` | same path |
| `src/app/api/ai-chat/message/route.ts` | same path |

**Delete these files** (no longer needed):
```
src/lib/models/lead.ts
src/lib/models/chat.ts
src/lib/models/content-draft.ts
src/lib/models/audit-log.ts
src/lib/models/notification.ts
src/lib/models/setting.ts
```

---

## 4. Add generated folder to .gitignore

Add this line to your `.gitignore`:
```
src/generated/
```

---

## 5. Update tsconfig.json

Make sure your `tsconfig.json` includes the generated folder:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "src/generated/**/*"]
}
```

---

## 6. Generate Prisma client & push schema

```bash
# Generate the Prisma client into src/generated/prisma/
npx prisma generate

# Push schema to your PostgreSQL database (creates all tables)
npx prisma db push
```

> Use `db push` for fast setup. For production with migration history, use:
> `npx prisma migrate dev --name init`

---

## 7. Verify the tables exist

```bash
npx prisma studio
```

Opens a visual browser at `http://localhost:5555` — you should see:
`Lead`, `LeadNote`, `LeadEvent`, `LeadTask`, `ChatSession`, `ChatMessage`,
`ContentDraft`, `AuditLog`, `Notification`, `Setting`

---

## 8. Update Vercel build command

In Vercel → Project Settings → Build & Development Settings → Build Command:
```
npx prisma generate && next build
```

Make sure `DATABASE_URL` is set in Vercel Environment Variables before deploying.

---

## Troubleshooting

**"Cannot find module '../generated/prisma'"** — Run `npx prisma generate` first

**"Can't reach database server"** — Check `DATABASE_URL` is set correctly in `.env.local`

**"Table does not exist"** — Run `npx prisma db push` again

**TypeScript errors on `id` vs `_id`** — All IDs are now `id` (string cuid), not `_id`. Any component rendering `lead._id` needs updating to `lead.id`.

**`prisma generate` must run before build** — Add to your Vercel build command as shown above.

---

## Key differences from MongoDB

| MongoDB / Mongoose | PostgreSQL / Prisma 7 |
|---|---|
| `Lead.find()` | `prisma.lead.findMany()` |
| `Lead.findById(id)` | `prisma.lead.findUnique({ where: { id } })` |
| `Lead.create(data)` | `prisma.lead.create({ data })` |
| `Lead.findByIdAndUpdate()` | `prisma.lead.update({ where, data })` |
| `$regex` search | `contains` + `mode: "insensitive"` |
| `$push` to subdoc array | Separate `prisma.leadNote.create()` etc. |
| `aggregate` pipeline | `prisma.lead.groupBy()` or `prisma.$queryRaw` |
| `_id` (ObjectId) | `id` (cuid string) |
| Embedded subdocuments | Separate relational tables with foreign keys |
| Import from `@prisma/client` | Import from `../generated/prisma` |

---

## 1. Install new dependencies

```bash
npm install prisma @prisma/client
npm uninstall mongoose mongodb
```

---

## 2. Set your environment variable

In `.env.local` (and Vercel → Project Settings → Environment Variables):

```env
# Remove this:
# MONGODB_URI=mongodb+srv://...

# Add this:
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require
```

**Free PostgreSQL options:**
- **Neon** (recommended) → https://neon.tech — free tier, serverless, Vercel-friendly
- **Supabase** → https://supabase.com — free tier with dashboard
- **Railway** → https://railway.app — easy deploy

---

## 3. Copy files into your project

Replace these files (paths relative to project root):

| File in this zip | Destination in your project |
|---|---|
| `prisma/schema.prisma` | `prisma/schema.prisma` ← new file |
| `src/lib/db.ts` | `src/lib/db.ts` |
| `src/lib/db-wrapper.ts` | `src/lib/db-wrapper.ts` |
| `src/lib/audit.ts` | `src/lib/audit.ts` |
| `src/lib/branding.ts` | `src/lib/branding.ts` |
| `src/lib/analytics-engine.ts` | `src/lib/analytics-engine.ts` |
| `src/lib/chat-engine.ts` | `src/lib/chat-engine.ts` |
| `src/lib/actions/lead-actions.ts` | `src/lib/actions/lead-actions.ts` |
| `src/lib/actions/dashboard-actions.ts` | `src/lib/actions/dashboard-actions.ts` |
| `src/lib/actions/analytics-actions.ts` | `src/lib/actions/analytics-actions.ts` |
| `src/lib/actions/notification-actions.ts` | `src/lib/actions/notification-actions.ts` |
| `src/lib/actions/quote-actions.ts` | `src/lib/actions/quote-actions.ts` |
| `src/lib/actions/admin-actions.ts` | `src/lib/actions/admin-actions.ts` |
| `src/app/api/admin/settings/tracking/route.ts` | same path |
| `src/app/api/admin/settings/system/route.ts` | same path |
| `src/app/api/admin/settings/status/route.ts` | same path |
| `src/app/api/admin/branding/route.ts` | same path |
| `src/app/api/admin/drafts/route.ts` | same path |
| `src/app/api/admin/drafts/[id]/route.ts` | same path |
| `src/app/api/admin/leads/export/route.ts` | same path |
| `src/app/api/admin/audit/export/route.ts` | same path |
| `src/app/api/ai-chat/start/route.ts` | same path |
| `src/app/api/ai-chat/message/route.ts` | same path |

**Delete these files** (no longer needed):
```
src/lib/models/lead.ts
src/lib/models/chat.ts
src/lib/models/content-draft.ts
src/lib/models/audit-log.ts
src/lib/models/notification.ts
src/lib/models/setting.ts
```

---

## 4. Generate Prisma client & push schema

```bash
# Generate the Prisma client
npx prisma generate

# Push schema to your PostgreSQL database (creates all tables)
npx prisma db push
```

> Use `db push` for fast setup. For production with migrations history, use:
> `npx prisma migrate dev --name init`

---

## 5. Verify the tables exist

```bash
npx prisma studio
```

Opens a visual browser at `http://localhost:5555` — you should see:
`Lead`, `LeadNote`, `LeadEvent`, `LeadTask`, `ChatSession`, `ChatMessage`,
`ContentDraft`, `AuditLog`, `Notification`, `Setting`

---

## 6. Update other files that reference MongoDB env var

Search your project for `MONGODB_URI` and replace references:

```bash
grep -r "MONGODB_URI" src/
```

The settings status page (`/admin/settings` → System tab) was updated to
show `DATABASE_URL` instead of `MONGODB_URI`. Check any other references.

---

## 7. Deploy

```bash
# Build locally to verify no TypeScript errors
npm run build

# Then deploy to Vercel as normal
vercel --prod
```

Make sure `DATABASE_URL` is set in Vercel environment variables before deploying.

---

## Key differences from MongoDB

| MongoDB / Mongoose | PostgreSQL / Prisma |
|---|---|
| `Lead.find()` | `prisma.lead.findMany()` |
| `Lead.findById(id)` | `prisma.lead.findUnique({ where: { id } })` |
| `Lead.create(data)` | `prisma.lead.create({ data })` |
| `Lead.findByIdAndUpdate()` | `prisma.lead.update({ where, data })` |
| `$regex` search | `contains` + `mode: "insensitive"` |
| `$push` to subdoc array | Separate `prisma.leadNote.create()` etc. |
| `aggregate` pipeline | `prisma.lead.groupBy()` or `prisma.$queryRaw` |
| `_id` (ObjectId) | `id` (cuid string) |
| Embedded subdocuments | Separate relational tables with foreign keys |

---

## Troubleshooting

**"Can't reach database server"** — Check DATABASE_URL, ensure IP is whitelisted (Neon/Supabase allow all by default)

**"Table does not exist"** — Run `npx prisma db push` again

**TypeScript errors on `id` vs `_id`** — All IDs are now `id` (string), not `_id` (ObjectId). Any component rendering `lead._id` needs updating to `lead.id`.

**`prisma generate` must run before build** — Add to your Vercel build command:
`prisma generate && next build`
