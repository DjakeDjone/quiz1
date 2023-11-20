migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("42ev5gjhxp8obt6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "da1vd6ds",
    "name": "comments",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "4iw6wlr7fuiv5t6",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kjrlprwe",
    "name": "writer",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("42ev5gjhxp8obt6")

  // remove
  collection.schema.removeField("da1vd6ds")

  // remove
  collection.schema.removeField("kjrlprwe")

  return dao.saveCollection(collection)
})
