class CustomStorage {
  constructor(storage) {
    this.store = storage;
  }

  set(key, value) {
    this.store.setItem(key, value);
  }
  get(key) {
    return this.store.getItem(key);
  }
}

export default CustomStorage;
