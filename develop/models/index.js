// import models
import Product, { belongsTo, belongsToMany } from './Product';
import Category, { hasMany } from './Category';
import Tag, { belongsToMany as _belongsToMany } from './Tag';
import ProductTag from './ProductTag';

belongsTo(Category, {
    foreignKey: 'category_id',
});

hasMany(Product, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
});

belongsToMany(Tag, {
    through: ProductTag,
    foreignKey: 'product_id'
})
// Tags belongToMany Products (through ProductTag)
_belongsToMany(Product, {
    through: ProductTag,
    foreignKey: 'tag_id',
})

export default {
    Product,
    Category,
    Tag,
    ProductTag,
};