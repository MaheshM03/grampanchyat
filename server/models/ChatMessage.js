// In-memory model (controller uses Map, this for compatibility)
let chatMessages = new Map();

module.exports = {
  create: (data) => {
    const id = Date.now().toString();
    chatMessages.set(id, data);
    return { id, ...data };
  },
  find: () => Array.from(chatMessages.values())
};

