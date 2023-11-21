migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4iw6wlr7fuiv5t6")

  // remove
  collection.schema.removeField("nt0qjl28")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4iw6wlr7fuiv5t6")

  // add
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
})
