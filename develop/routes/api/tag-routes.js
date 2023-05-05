const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


router.get('/', async (req, res) => {

  try{
    const dbTagData = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        },
      ],
    });

    res.json(dbTagData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // finds a single tag by its `id`
  // includes its associated Product data
  try{
    const dbTagData = await Tag.findOne({
      where: {
        id: req.params.id
      },

      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        },
      ],
    });
    if (!dbTagData){
      res.status(404).json({ message: 'No Tags found with this id'});
      return;
    }
    res.json(dbTagData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const dbTagData = await Tag.create({
      tag_name: req.body.tag_name
    });

    res.json(dbTagData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const dbTagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      },

    });
    if (!dbTagData[0]){
      res.status(404).json({ message: 'No Tag found with this id'});
      return;
    }
    res.json(dbTagData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {

  try{
    const dbTagData = await Tag.destroy({
      where: {
        id: req.params.id
      },

    });
    if (dbTagData === 0){
      res.status(404).json({ message: 'No tag found with this id'});
      return;
    }

    res.json(dbTagData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;