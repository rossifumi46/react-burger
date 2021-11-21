import { Location } from 'history';

export type TIngredient = {
  _id: string;
  name: string;
  price: number;
  image: string;
  type: string,
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  image_mobile: string;
  image_large: string;
}

export type TOrderDetails = {
  name: string;
  order: {
    number: number;
  },
  success: boolean;
}

export type TParams = {
  id: string;
}

export type TLocationState = {
  isActive?: boolean;
  ingredient?: Location;
  from?: Location;
  order?: Location;
}