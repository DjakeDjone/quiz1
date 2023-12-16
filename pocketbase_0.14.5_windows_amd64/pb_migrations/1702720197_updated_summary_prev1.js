migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8ahiqh772163rkv")

  collection.name = "summary_prev"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8ahiqh772163rkv")

  collection.name = "summary_prev1"

  return dao.saveCollection(collection)
})
