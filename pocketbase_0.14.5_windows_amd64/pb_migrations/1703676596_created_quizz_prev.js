migrate((db) => {
  const collection = new Collection({
    "id": "urd2du9nz9x9rg4",
    "created": "2023-12-27 11:29:56.265Z",
    "updated": "2023-12-27 11:29:56.265Z",
    "name": "quizz_prev",
    "type": "view",
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
        "id": "4luqywpn",
        "name": "description",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT id, title, description, created, updated FROM quizzes;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("urd2du9nz9x9rg4");

  return dao.deleteCollection(collection);
})
