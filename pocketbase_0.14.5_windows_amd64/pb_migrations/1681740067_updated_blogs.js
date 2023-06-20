migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9vazoth98njgdv9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "srk0vsix",
    "name": "title",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "u2cw198e",
    "name": "content",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9vazoth98njgdv9")

  // remove
  collection.schema.removeField("srk0vsix")

  // remove
  collection.schema.removeField("u2cw198e")

  return dao.saveCollection(collection)
})
