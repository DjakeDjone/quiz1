migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5y961pk370v37cf")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qmvetgkx",
    "name": "questions",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "k70qoet0ik16rz6",
      "cascadeDelete": true,
      "minSelect": 2,
      "maxSelect": 50,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5y961pk370v37cf")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qmvetgkx",
    "name": "questions",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "k70qoet0ik16rz6",
      "cascadeDelete": false,
      "minSelect": 2,
      "maxSelect": 50,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
