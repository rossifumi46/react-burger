import PropTypes from 'prop-types';

export const ingredientPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
  });

export const orderDetails = PropTypes.shape({
  name: PropTypes.string.isRequired,
  order: PropTypes.shape({
    number: PropTypes.number.isRequired,
  }),
  success: PropTypes.bool.isRequired,
})