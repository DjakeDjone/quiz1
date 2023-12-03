migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n61hxakh3en7zwt")

  // remove
  collection.schema.removeField("xo8nlolv")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n61hxakh3en7zwt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xo8nlolv",
    "name": "quizzes",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "5y961pk370v37cf",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
