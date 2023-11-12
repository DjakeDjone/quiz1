migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("86vtj702abh24gn");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "86vtj702abh24gn",
    "created": "2023-11-12 10:53:29.652Z",
    "updated": "2023-11-12 11:56:04.854Z",
    "name": "files",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "biwaeouf",
        "name": "documents",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [],
          "thumbs": []
        }
      },
      {
        "system": false,
        "id": "kfjyux0p",
        "name": "users",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
