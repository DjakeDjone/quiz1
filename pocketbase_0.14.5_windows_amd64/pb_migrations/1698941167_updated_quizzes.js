migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5y961pk370v37cf")

  // remove
  collection.schema.removeField("qmvetgkx")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5y961pk370v37cf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qmvetgkx",
    "name": "questions",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "k70qoet0ik16rz6",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 50,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
