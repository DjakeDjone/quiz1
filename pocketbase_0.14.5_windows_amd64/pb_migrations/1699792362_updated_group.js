migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n61hxakh3en7zwt")

  collection.name = "groups"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n61hxakh3en7zwt")

  collection.name = "group"

  return dao.saveCollection(collection)
})
