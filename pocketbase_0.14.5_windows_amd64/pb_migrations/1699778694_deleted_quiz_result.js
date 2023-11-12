migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("3cv7r8i3m7ck3u3");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "3cv7r8i3m7ck3u3",
    "created": "2023-11-12 08:43:12.988Z",
    "updated": "2023-11-12 08:43:12.988Z",
    "name": "quiz_result",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mycpt9jt",
        "name": "quiz",
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
      },
      {
        "system": false,
        "id": "7b7b9adh",
        "name": "points",
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
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
