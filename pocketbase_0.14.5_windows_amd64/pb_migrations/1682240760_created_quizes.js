migrate((db) => {
  const collection = new Collection({
    "id": "5y961pk370v37cf",
    "created": "2023-04-23 09:06:00.472Z",
    "updated": "2023-04-23 09:06:00.472Z",
    "name": "quizes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hpyemed6",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "r4hqrbz3",
        "name": "creator",
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
      },
      {
        "system": false,
        "id": "hz8bxuvu",
        "name": "questions",
        "type": "json",
        "required": true,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "mqbrzqlg",
        "name": "signalWords",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "creator.id = @request.auth.id",
    "deleteRule": "creator.id = @request.auth.id",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("5y961pk370v37cf");

  return dao.deleteCollection(collection);
})
