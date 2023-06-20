migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5y961pk370v37cf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pmbqqlss",
    "name": "description",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5y961pk370v37cf")

  // remove
  collection.schema.removeField("pmbqqlss")

  return dao.saveCollection(collection)
})
