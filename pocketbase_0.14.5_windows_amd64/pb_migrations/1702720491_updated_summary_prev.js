migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8ahiqh772163rkv")

  collection.options = {
    "query": "SELECT id, title, description, stars, created, updated, writer FROM summaries;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "raad6i8t",
    "name": "title",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": 30,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ju1kmd5f",
    "name": "description",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 300,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qhr37fbe",
    "name": "stars",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 5
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kjrlprwe",
    "name": "writer",
    "type": "relation",
    "required": true,
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
  const collection = dao.findCollectionByNameOrId("8ahiqh772163rkv")

  collection.options = {
    "query": "SELECT id FROM summaries;"
  }

  // remove
  collection.schema.removeField("raad6i8t")

  // remove
  collection.schema.removeField("ju1kmd5f")

  // remove
  collection.schema.removeField("qhr37fbe")

  // remove
  collection.schema.removeField("kjrlprwe")

  return dao.saveCollection(collection)
})
