migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k70qoet0ik16rz6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "whdvvrxn",
    "name": "quiz",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "5y961pk370v37cf",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k70qoet0ik16rz6")

  // remove
  collection.schema.removeField("whdvvrxn")

  return dao.saveCollection(collection)
})
