const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models').default;



router.get('/', async (req, res) => {

    const tagData = await Tag.findAll({
    include: [{model: Product}],
  });
    return res.status(200).json(tagData);
});

router.get('/:id', async (req, res) => {

  try {
      const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}],
    });
      if(!tagData) {
      throw new Error("Tag not found");
    }
      res.status(200).json(tagData);
  }   catch (err) {
      res.status(400).json(err.message);
  }
});

router.post('/', async (req, res) => {
 
  try {
    const tagData = await Tag.create({
    tag_name: req.body.tag_name
  });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
 
  const tagData = await Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id,
      }
    }
  );
  res.status(200).json(tagData);
});

router.delete('/:id', async (req, res) => {

  const tagData = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(tagData);
});

module.exports = router;