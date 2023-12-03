migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("k70qoet0ik16rz6");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "k70qoet0ik16rz6",
    "created": "2023-10-31 16:34:59.403Z",
    "updated": "2023-11-12 14:53:55.343Z",
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
        "id": "whdvvrxn",
        "name": "quiz",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "5y961pk370v37cf",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "tpxez7fv",
        "name": "possible_answers",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "quiz.creator.id = @request.auth.id",
    "updateRule": "quiz.creator.id = @request.auth.id",
    "deleteRule": "quiz.creator.id = @request.auth.id",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
