migrate((db) => {
  const collection = new Collection({
    "id": "4iw6wlr7fuiv5t6",
    "created": "2023-11-20 18:33:59.749Z",
    "updated": "2023-11-20 18:33:59.749Z",
    "name": "comments",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fttkeeqp",
        "name": "content",
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
        "id": "qh51pfhg",
        "name": "writer",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
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
  const collection = dao.findCollectionByNameOrId("4iw6wlr7fuiv5t6");

  return dao.deleteCollection(collection);
})
