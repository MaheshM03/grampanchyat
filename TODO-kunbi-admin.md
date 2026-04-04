# Admin Kunbi Records CRUD

**Status:** Planning

## Backend (server/)
- [ ] models/KunbiRecord.js → Mongoose schema (title, subtitle, year, pages, fileUrl, content)
- [ ] controllers/kunbiRecordController.js → getAll, create, update, delete
- [ ] routes/kunbi.js → /api/kunbi routes
- [ ] server.js → app.use('/api/kunbi', kunbiRoutes)

## Frontend (client/src/)
- [ ] context/KunbiContext.js → Like NewsContext
- [ ] pages/KunbiRecords.jsx → Replace static with useKunbi + table/list
- [ ] pages/AdminPanel.jsx → Add Kunbi tab/section (copy News form)
- [ ] App.js → Add KunbiProvider wrapper

## Schema fields:
```
title (req)
subtitle (req)
year (req)
pages (req)
fileUrl (opt)
content (opt)
createdAt
updatedAt
```

**Demo login:** admin / admin123
