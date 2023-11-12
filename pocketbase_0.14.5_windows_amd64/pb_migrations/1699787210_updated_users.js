migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("lxrws3tr")

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
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lxrws3tr",
    "name": "files",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 99,
      "maxSize": 524288000,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  // remove
  collection.schema.removeField("kcpu8i1c")

  return dao.saveCollection(collection)
})
