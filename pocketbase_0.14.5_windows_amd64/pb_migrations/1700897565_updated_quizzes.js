migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jhwiobd404rfvzv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4luqywpn",
    "name": "description",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jhwiobd404rfvzv")

  // remove
  collection.schema.removeField("4luqywpn")

  return dao.saveCollection(collection)
})
