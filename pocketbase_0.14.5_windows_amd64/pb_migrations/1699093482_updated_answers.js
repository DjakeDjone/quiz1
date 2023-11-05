migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("26b8b7ddxf8qoiy")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "awtaehll",
    "name": "text",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h3biijom",
    "name": "question",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "k70qoet0ik16rz6",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("26b8b7ddxf8qoiy")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "awtaehll",
    "name": "text",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h3biijom",
    "name": "question",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "k70qoet0ik16rz6",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
