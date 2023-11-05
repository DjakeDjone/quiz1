migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k70qoet0ik16rz6")

  collection.createRule = "quiz.creator.id = @request.auth.id"
  collection.updateRule = "quiz.creator.id = @request.auth.id"
  collection.deleteRule = "quiz.creator.id = @request.auth.id"

  // remove
  collection.schema.removeField("aleskqpe")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "whdvvrxn",
    "name": "quiz",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "5y961pk370v37cf",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k70qoet0ik16rz6")

  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "aleskqpe",
    "name": "creator",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "whdvvrxn",
    "name": "quiz",
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

  return dao.saveCollection(collection)
})
