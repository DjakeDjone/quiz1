migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("86vtj702abh24gn")

  collection.name = "files"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "biwaeouf",
    "name": "documents",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("86vtj702abh24gn")

  collection.name = "test"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "biwaeouf",
    "name": "documents",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 99,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
})
