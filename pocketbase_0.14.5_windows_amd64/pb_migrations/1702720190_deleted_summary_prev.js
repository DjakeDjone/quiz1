migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("i14x1cemgnfp79d");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "i14x1cemgnfp79d",
    "created": "2023-12-16 09:47:46.222Z",
    "updated": "2023-12-16 09:47:46.222Z",
    "name": "summary_prev",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "cl2wtyt6",
        "name": "summary",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "42ev5gjhxp8obt6",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "ffrfz64n",
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
        "id": "ln7p6rb0",
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
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
