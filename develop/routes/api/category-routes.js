const router = require('express').Router();
const { Category, Product } = require('../../models').default;





router.get('/', async (req, res) => {
  const categories = await Category.findAll({
    include: [{model: Product}],
  });
  return res.status(200).json(categories);

});



router.get('/:id', async (req, res) => {
  
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