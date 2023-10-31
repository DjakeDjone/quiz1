migrate((db) => {
  const collection = new Collection({
    "id": "n61hxakh3en7zwt",
    "created": "2023-10-31 16:28:58.138Z",
    "updated": "2023-10-31 16:28:58.138Z",
    "name": "group",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xo8nlolv",
        "name": "quizzes",
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
  const collection = dao.findCollectionByNameOrId("n61hxakh3en7zwt");

  return dao.deleteCollection(collection);
})
