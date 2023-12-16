migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("42ev5gjhxp8obt6")

  collection.listRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("42ev5gjhxp8obt6")

  collection.listRule = ""

  return dao.saveCollection(collection)
})
