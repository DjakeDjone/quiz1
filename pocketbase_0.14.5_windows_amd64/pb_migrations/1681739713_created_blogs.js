migrate((db) => {
  const collection = new Collection({
    "id": "9vazoth98njgdv9",
    "created": "2023-04-17 13:55:13.267Z",
    "updated": "2023-04-17 13:55:13.267Z",
    "name": "blogs",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lducohdd",
        "name": "comments",
        "type": "json",
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
  const collection = dao.findCollectionByNameOrId("9vazoth98njgdv9");

  return dao.deleteCollection(collection);
})
