migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4iw6wlr7fuiv5t6")

  collection.createRule = "writer.id = @request.auth.id && @collection.comments.writer ?!= writer"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4iw6wlr7fuiv5t6")

  collection.createRule = null

  return dao.saveCollection(collection)
})
