migrate((db) => {
  const collection = new Collection({
    "id": "k70qoet0ik16rz6",
    "created": "2023-10-31 16:34:59.403Z",
    "updated": "2023-10-31 16:34:59.403Z",
    "name": "questions",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lum5wnen",
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
        "id": "iikzqbhu",
        "name": "answers",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "5y961pk370v37cf",
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
  const collection = dao.findCollectionByNameOrId("k70qoet0ik16rz6");

  return dao.deleteCollection(collection);
})
