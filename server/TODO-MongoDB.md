# MongoDB Connection Setup - Grampanchyat Project ✅

## Steps Completed:
- [x] 1. Create/update server/.env with MONGODB_URI *(USER: copy server/.env.example → server/.env)*
- [x] 2. Create/update server/.env.example *(DONE)*
- [x] 3. Fix server/server.js deprecated options *(DONE)*
- [ ] 4. Test connection: cd server && npm start
- [ ] 5. Verify "✅ MongoDB connected successfully to grampanchyat DB" log
- [ ] 6. Test API endpoints (e.g., POST /api/grievance)

## Progress Tracking
- Backend configured for mongodb://localhost:27017/grampanchyat
- .env.example ready - copy to .env manually
- server.js improved with DB options

**Next:** User copy .env, run `npm run start` (runs `cd server && npm install && node server.js`), check logs.

## Final Test Commands:
```bash
# Start server
npm run start

# Test connection (in new terminal)
curl http://localhost:5000/api/test
```

