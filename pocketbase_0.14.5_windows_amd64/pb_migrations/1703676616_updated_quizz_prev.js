migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("urd2du9nz9x9rg4")

  collection.options = {
    "query": "SELECT id, title, description, created, updated, creator FROM quizzes;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gr41kgiu",
    "name": "creator",
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
  const collection = dao.findCollectionByNameOrId("urd2du9nz9x9rg4")

  collection.options = {
    "query": "SELECT id, title, description, created, updated FROM quizzes;"
  }

  // remove
  collection.schema.removeField("gr41kgiu")

  return dao.saveCollection(collection)
})
