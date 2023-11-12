migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("kcpu8i1c")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rrhcqq4z",
    "name": "files",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 20,
      "maxSize": 5242880000,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kcpu8i1c",
    "name": "files",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "86vtj702abh24gn",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // remove
  collection.schema.removeField("rrhcqq4z")

  return dao.saveCollection(collection)
})
