migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("26b8b7ddxf8qoiy")

  // remove
  collection.schema.removeField("csaa5ksz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h3biijom",
    "name": "question",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "k70qoet0ik16rz6",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("26b8b7ddxf8qoiy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "csaa5ksz",
    "name": "question",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "26b8b7ddxf8qoiy",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // remove
  collection.schema.removeField("h3biijom")

  return dao.saveCollection(collection)
})
