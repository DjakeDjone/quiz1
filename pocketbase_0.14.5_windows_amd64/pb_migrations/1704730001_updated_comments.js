migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4iw6wlr7fuiv5t6")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qh51pfhg",
    "name": "writer",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4iw6wlr7fuiv5t6")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qh51pfhg",
    "name": "writer",
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
  }))

  return dao.saveCollection(collection)
})
