migrate((db) => {
  const collection = new Collection({
    "id": "jhwiobd404rfvzv",
    "created": "2023-11-24 13:27:40.679Z",
    "updated": "2023-11-24 13:27:40.679Z",
    "name": "quizzes2",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "cos9c46s",
        "name": "title",
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
        "id": "tubm3xta",
        "name": "quiz",
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
  const collection = dao.findCollectionByNameOrId("jhwiobd404rfvzv");

  return dao.deleteCollection(collection);
})
