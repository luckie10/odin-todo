import WebStorageHandler from "./webstorage";

const handler = WebStorageHandler.storageAvailable("localStorage")
  ? WebStorageHandler
  : {}; // TODO: implement non WebStorage option

const Storage = ((handler) => {
  return {};
})(handler);

export { Storage as default };
