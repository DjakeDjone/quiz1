migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5y961pk370v37cf")

  // remove
  collection.schema.removeField("hz8bxuvu")

  // remove
  collection.schema.removeField("mqbrzqlg")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5y961pk370v37cf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hz8bxuvu",
    "name": "questions",
    "type": "json",
    "required": true,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mqbrzqlg",
    "name": "signalWords",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
