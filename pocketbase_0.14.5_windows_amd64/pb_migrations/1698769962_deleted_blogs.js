migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("9vazoth98njgdv9");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "9vazoth98njgdv9",
    "created": "2023-04-17 13:55:13.267Z",
    "updated": "2023-04-17 14:10:29.791Z",
    "name": "blogs",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lducohdd",
        "name": "comments",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "srk0vsix",
        "name": "title",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": 20,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "u2cw198e",
        "name": "content",
        "type": "editor",
        "required": true,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "gypz2lyg",
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
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "@request.auth.id != \"\" && creator.id = @request.auth.id",
    "updateRule": "creator.id = @request.auth.id",
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
