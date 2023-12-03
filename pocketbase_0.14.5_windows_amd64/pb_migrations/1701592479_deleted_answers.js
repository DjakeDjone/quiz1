migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("26b8b7ddxf8qoiy");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "26b8b7ddxf8qoiy",
    "created": "2023-10-31 16:35:59.560Z",
    "updated": "2023-11-04 10:24:42.132Z",
    "name": "answers",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "45yq2el3",
        "name": "correct",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "awtaehll",
        "name": "text",
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
        "id": "h3biijom",
        "name": "question",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "k70qoet0ik16rz6",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "question.quiz.creator.id = @request.auth.id",
    "updateRule": "question.quiz.creator.id = @request.auth.id",
    "deleteRule": "question.quiz.creator.id = @request.auth.id",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
