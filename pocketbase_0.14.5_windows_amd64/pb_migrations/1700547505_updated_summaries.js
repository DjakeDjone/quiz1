migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("42ev5gjhxp8obt6")

  collection.createRule = "writer.id = @request.auth.id"
  collection.updateRule = "writer.id = @request.auth.id"
  collection.deleteRule = "writer.id = @request.auth.id"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kjrlprwe",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("42ev5gjhxp8obt6")

  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kjrlprwe",
    "name": "writer",
    "type": "relation",
    "required": false,
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
