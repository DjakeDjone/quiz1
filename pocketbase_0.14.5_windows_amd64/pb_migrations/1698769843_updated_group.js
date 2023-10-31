migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n61hxakh3en7zwt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zxqovzht",
    "name": "name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uyd3chkg",
    "name": "files",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 99,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fsrnysxu",
    "name": "users",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
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
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n61hxakh3en7zwt")

  // remove
  collection.schema.removeField("zxqovzht")

  // remove
  collection.schema.removeField("uyd3chkg")

  // remove
  collection.schema.removeField("fsrnysxu")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
