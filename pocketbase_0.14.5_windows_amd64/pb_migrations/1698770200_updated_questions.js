migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k70qoet0ik16rz6")

  // remove
  collection.schema.removeField("iikzqbhu")

  // add
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k70qoet0ik16rz6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iikzqbhu",
    "name": "answers",
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

  // remove
  collection.schema.removeField("4qvakq8b")

  return dao.saveCollection(collection)
})
