# Server Mongoose → In-Memory Fix (LocalStorage Style)
Status: 🔄 In Progress

## Steps (0/11 complete)

### 1. ✅ Gather Files [COMPLETE]
- All models use mongoose
- Controllers use models

### 2. 🔄 Edit Models (7 files)
```
server/models/*.js → Remove mongoose, export dummy DB methods:
module.exports = {
  create: (data) => data,
  find: () => [],
  findById: () => null,
  findOneAndUpdate: () => null
};
```

### 3. 🔄 Edit chatController.js
```
Replace ChatMessage with in-memory Map:
const chatHistory = new Map();
- ChatMessage.create → chatHistory.getOrCreate(sessionId).push()
```

### 4. 🔄 Edit newsController.js
```
inMemoryNews = [];
CRUD on array
```

### 5. 🔄 Edit kunbiRecordController.js
```
inMemoryKunbi = sampleData;
```

### 6. 🔄 Edit certificate controllers (3 files)
```
inMemoryCertificates = [];
```

### 7. 🔄 Edit contactController.js
```
inMemoryContacts = [];
```

### 8. 💾 Apply Edits

### 9. 🚀 cd server && npm run dev

### 10. ✅ Test proxy /api/news /api/kunbi

### 11. ✅ Test chatbot button + messages

**Goal:** Server starts → Proxy works → Chatbot functional (in-memory)

