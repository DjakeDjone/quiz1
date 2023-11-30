migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("42ev5gjhxp8obt6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qhr37fbe",
    "name": "stars",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 5
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("42ev5gjhxp8obt6")

  // remove
  collection.schema.removeField("qhr37fbe")

  return dao.saveCollection(collection)
})
