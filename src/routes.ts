import { Router } from 'express'
import { body, oneOf } from 'express-validator'
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/product'
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update'
import { handleValidationResultErrors } from './modules/middlewares'

const router = Router()

/**
 * Product
 */
router.get('/product', getProducts)
router.get('/product/:id', getOneProduct)
router.put('/product/:id', body('name').isString(), handleValidationResultErrors, updateProduct)
router.post('/product', body('name').isString(), handleValidationResultErrors, createProduct)
router.delete('/product/:id', deleteProduct)

/**
 * Updates
 */
router.get('/update', getUpdates)
router.get('/update/:id', getOneUpdate)
router.put('/update/:id',
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('status').isIn(['IN PROGRESS', 'SHIPPED', 'DEPRECATED']),
  body('version').optional(),
  updateUpdate
)
router.post('/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  createUpdate
)
router.delete('/update/:id', deleteUpdate)

/**
 * Update Points
 */

router.get('/updatepoint', (req, res) => {
  res.json({ message: 'updatepoint' })
})

router.get('/updatepoint/:id', () => {

})

router.put('/updatepoint/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  (req, res) => {
  
})

router.post('/updatepoint',
  body('name').optional().isString(),
  body('description').optional().isString(),
  body('updateId').exists().isString(),
  (req, res) => {
  
})

router.delete('/updatepoint/:id', () => {
  
})

// NOTE: sub routes need their own error handlers
// put error handlers at the bottom
router.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(401).json({ message: 'unauthorized', error: err })
  } else if (err.type === 'input') {
    res.status(400).json({ message: 'invalid input', error: err })
  } else {
    res.status(500).json({ message: 'server error', error: err })
  }
})


export default router
