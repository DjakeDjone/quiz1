migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k70qoet0ik16rz6")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4qvakq8b",
    "name": "answers",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "26b8b7ddxf8qoiy",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k70qoet0ik16rz6")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4qvakq8b",
    "name": "answers",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "26b8b7ddxf8qoiy",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
