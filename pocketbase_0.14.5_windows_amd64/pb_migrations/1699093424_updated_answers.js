migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("26b8b7ddxf8qoiy")

  collection.createRule = "question.quiz.creator.id = @request.auth.id"
  collection.updateRule = "question.quiz.creator.id = @request.auth.id"
  collection.deleteRule = "question.quiz.creator.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("26b8b7ddxf8qoiy")

  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
