migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("42ev5gjhxp8obt6")

  // remove
  collection.schema.removeField("qlhmz29e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6eiwoa2f",
    "name": "quiz",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "jhwiobd404rfvzv",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("42ev5gjhxp8obt6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qlhmz29e",
    "name": "quiz",
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

  // remove
  collection.schema.removeField("6eiwoa2f")

  return dao.saveCollection(collection)
})
