migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4iw6wlr7fuiv5t6")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = "writer.id = @request.auth.id"
  collection.updateRule = "writer.id = @request.auth.id"
  collection.deleteRule = "writer.id = @request.auth.id"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nt0qjl28",
    "name": "summary",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "42ev5gjhxp8obt6",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4iw6wlr7fuiv5t6")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nt0qjl28",
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
  }))

  return dao.saveCollection(collection)
})
