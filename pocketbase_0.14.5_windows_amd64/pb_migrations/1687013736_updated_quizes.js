migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5y961pk370v37cf")

  collection.viewRule = "public = true || creator.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5y961pk370v37cf")

  collection.viewRule = null

  return dao.saveCollection(collection)
})
