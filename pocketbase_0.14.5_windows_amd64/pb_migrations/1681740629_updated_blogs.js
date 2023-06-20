migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9vazoth98njgdv9")

  collection.createRule = "@request.auth.id != \"\" && creator.id = @request.auth.id"
  collection.updateRule = "creator.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9vazoth98njgdv9")

  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
