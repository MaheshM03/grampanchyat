// Dummy in-memory model - replaces mongoose
// All controllers already use local arrays, this prevents require errors

module.exports = {
  create: (data) => ({ ...data, id: Date.now().toString() }),
  find: () => [],
  findById: (id) => null,
  findOne: () => null,
  findOneAndUpdate: () => null,
  save: function() { return this; },
  Schema: class {}, // dummy
  model: () => this
};

