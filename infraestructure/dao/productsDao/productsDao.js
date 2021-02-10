// import { ObjectId } from "bson"


let products

exports.injectdb = async (conn) => {
    if (products) {
      return
    }
    try {
      NameDB = await conn.db(process.env.NAME_DB)
      products = await conn.db(process.env.NAME_DB).collection("Products")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in productController: ${e}`,
      )
    }
  }

  exports.createNewProduct =async (name) => {
    try {
      // TODO Ticket: Create/Update Comments
      // Construct the comment document to be inserted into MongoDB.
      const commentDoc = { 
                name:  name, 
              }

      return await products.insertOne(commentDoc)
    } catch (e) {
      console.error(`Unable to post comment: ${e}`)
      return { error: e }
    }
  }
 