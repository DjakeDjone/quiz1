migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n61hxakh3en7zwt")

  collection.createRule = "users.id = @request.auth.id"
  collection.updateRule = "users.id = @request.auth.id"
  collection.deleteRule = "users.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n61hxakh3en7zwt")

  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
