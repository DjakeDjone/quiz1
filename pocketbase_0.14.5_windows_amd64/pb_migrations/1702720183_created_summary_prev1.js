migrate((db) => {
  const collection = new Collection({
    "id": "8ahiqh772163rkv",
    "created": "2023-12-16 09:49:43.287Z",
    "updated": "2023-12-16 09:49:43.287Z",
    "name": "summary_prev1",
    "type": "view",
    "system": false,
    "schema": [],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT id FROM summaries;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("8ahiqh772163rkv");

  return dao.deleteCollection(collection);
})
