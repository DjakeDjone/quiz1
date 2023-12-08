migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("42ev5gjhxp8obt6")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6eiwoa2f",
    "name": "quizzes",
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

  // update
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
})
