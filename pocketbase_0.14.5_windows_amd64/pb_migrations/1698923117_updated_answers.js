migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("26b8b7ddxf8qoiy")

  // remove
  collection.schema.removeField("n7eqgmsr")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("26b8b7ddxf8qoiy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n7eqgmsr",
    "name": "question",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
