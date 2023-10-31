migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k70qoet0ik16rz6")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = "creator.id = @request.auth.id"
  collection.updateRule = "creator.id = @request.auth.id"
  collection.deleteRule = "creator.id = @request.auth.id"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "aleskqpe",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k70qoet0ik16rz6")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  // remove
  collection.schema.removeField("aleskqpe")

  return dao.saveCollection(collection)
})
