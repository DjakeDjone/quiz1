migrate((db) => {
  const collection = new Collection({
    "id": "42ev5gjhxp8obt6",
    "created": "2023-10-31 16:32:15.645Z",
    "updated": "2023-10-31 16:32:15.645Z",
    "name": "summaries",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "prwgjnuo",
        "name": "data",
        "type": "editor",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("42ev5gjhxp8obt6");

  return dao.deleteCollection(collection);
})
