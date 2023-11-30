migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4iw6wlr7fuiv5t6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x319vac6",
    "name": "stars",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4iw6wlr7fuiv5t6")

  // remove
  collection.schema.removeField("x319vac6")

  return dao.saveCollection(collection)
})
