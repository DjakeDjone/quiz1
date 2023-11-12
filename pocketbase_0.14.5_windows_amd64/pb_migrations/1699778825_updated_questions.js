migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k70qoet0ik16rz6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tpxez7fv",
    "name": "possible_answers",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k70qoet0ik16rz6")

  // remove
  collection.schema.removeField("tpxez7fv")

  return dao.saveCollection(collection)
})
