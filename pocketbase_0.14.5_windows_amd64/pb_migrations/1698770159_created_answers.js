migrate((db) => {
  const collection = new Collection({
    "id": "26b8b7ddxf8qoiy",
    "created": "2023-10-31 16:35:59.560Z",
    "updated": "2023-10-31 16:35:59.560Z",
    "name": "answers",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "n7eqgmsr",
        "name": "question",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "45yq2el3",
        "name": "truthful",
        "type": "bool",
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
  const collection = dao.findCollectionByNameOrId("26b8b7ddxf8qoiy");

  return dao.deleteCollection(collection);
})
