# MongoDB Admin User Creation - Grampanchyat Project

## Steps:
- [ ] 1. Run MongoDB shell and create admin user
- [ ] 2. Update server/.env.example with auth URI
- [ ] 3. Update server/.env with auth URI
- [ ] 4. Restart server: npm run start
- [ ] 5. Verify authenticated connection

## MongoDB Admin Creation Commands
Run in **NEW TERMINAL** (PowerShell/cmd):

```bash
mongosh
```
Then in shell:
```js
use admin
db.createUser({
  user: \"grampanchyat_admin\",
  pwd: \"Grampanchyat2024!\",
  roles: [{ role: \"userAdminAnyDatabase\", db: \"admin\" }, \"readWriteAnyDatabase\"]
})
exit
```

## Updated .env URI
```
MONGODB_URI=mongodb://grampanchyat_admin:Grampanchyat2024!@localhost:27017/grampanchyat?authSource=admin
```

**Security:** Strong password used. Restart mongod service if auth not enabled.

**Progress:** Update after each step.

