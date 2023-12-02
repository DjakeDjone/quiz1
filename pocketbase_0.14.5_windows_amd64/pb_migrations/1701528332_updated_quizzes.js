migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jhwiobd404rfvzv")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tubm3xta",
    "name": "questions",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jhwiobd404rfvzv")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tubm3xta",
    "name": "quiz",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
