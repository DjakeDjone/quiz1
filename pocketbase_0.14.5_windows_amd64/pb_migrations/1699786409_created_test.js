migrate((db) => {
  const collection = new Collection({
    "id": "86vtj702abh24gn",
    "created": "2023-11-12 10:53:29.652Z",
    "updated": "2023-11-12 10:53:29.652Z",
    "name": "test",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "biwaeouf",
        "name": "documents",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 99,
          "maxSize": 5242880,
          "mimeTypes": [],
          "thumbs": []
        }
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
  const collection = dao.findCollectionByNameOrId("86vtj702abh24gn");

  return dao.deleteCollection(collection);
})
