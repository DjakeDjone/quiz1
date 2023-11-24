migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jhwiobd404rfvzv")

  collection.name = "quizzes"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jhwiobd404rfvzv")

  collection.name = "quizzes2"

  return dao.saveCollection(collection)
})
