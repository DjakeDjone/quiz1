migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5y961pk370v37cf")

  collection.name = "quizzes"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5y961pk370v37cf")

  collection.name = "quizes"

  return dao.saveCollection(collection)
})
