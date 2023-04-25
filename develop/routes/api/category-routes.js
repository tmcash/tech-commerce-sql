const router = require('express').Router();
const { Category, Product } = require('../../models').default;

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  const categories = await Category.findAll({
    include: [{model: Product}],
  });
  return res.status(200).json(categories);

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryByID = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if(!categoryByID) {
      throw new Error("Category not found");
    }
    res.status(200).json(categoryByID);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
    category_name: req.body.category_name
  });
  res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
 
  const category = await Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id,
      }
    }
  );
  res.status(200).json(category);
});

router.delete('/:id', async (req, res) => {

  const category = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(category);
});

module.exports = router;