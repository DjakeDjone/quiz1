migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4iw6wlr7fuiv5t6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "okozejab",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4iw6wlr7fuiv5t6")

  // remove
  collection.schema.removeField("okozejab")

  return dao.saveCollection(collection)
})
