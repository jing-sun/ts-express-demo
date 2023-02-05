import prisma from '../db'

// for get all /updates for a given user across all products
export const getUpdates = async (req, res) => {
  // first find all the products for a user, then find the updates for those products
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id
    },
    include: {
      updates: true // need to explicity include fields that show be returned
    }
  })

  // const updates = products.reduce((allUpdates, product) => {
  //   return [ ...allUpdates, ...product.updates ] // add the incremental product.updates to the running list
  // }, []) // start with an empty array

  const updates = products.map(p => p.updates)

  res.json({ data: updates })
}

// get one update by id
export const getOneUpdate = async (req, res) => {
  const id = req.params.id

  const update = await prisma.update.findUnique({
    where: {
      id,
    }
  })

  res.json({ data: update })
}

export const createUpdate = async (req, res) => {
  const { productId, title, body, version } = req.body

  const product = await prisma.product.findUnique({
    where: {
      id: productId
    }
  })
  
  if (!product) {
    // does not belong to user
    return res.json({ message: 'no product found' })
  }

  const update = await prisma.update.create({
    data: {
      title,
      body,
      product: {
        connect: {
          id: product.id
        }
      },
      version
    }
  })

  res.json({ data: update })
}

// update an Update
export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id
    },
    include: {
      updates: true
    }
  })

  const updates = products.reduce((allUpdates, product) => {
    return [ ...allUpdates, ...product.updates ] // add the incremental product.updates to the running list
  }, []) // start with an empty array

  const match = updates.find(update => update.id === req.params.id)

  if (!match) {
    // handle none found
    return res.json({ message: 'no update found' })
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id
    },
    data: req.body
  })

  res.json({ data: updatedUpdate })
}

export const deleteUpdate = async (req, res) => {
  // first check update belongs to user
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id
    },
    include: {
      updates: true
    }
  })

  const updates = products.reduce((allUpdates, product) => {
    return [ ...allUpdates, ...product.updates ] // add the incremental product.updates to the running list
  }, []) // start with an empty array

  const match = updates.find(update => update.id === req.params.id)

  if (!match) {
    // handle none found
    return res.json({ message: 'no update found' })
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id
    }
  })

  res.json({ data: deleted })
}