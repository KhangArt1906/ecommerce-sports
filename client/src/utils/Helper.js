import icons from "./Icons";

const { AiOutlineStar, AiFillStar } = icons;
// Slug
export const createSlug = (string) =>
  string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");
// Formatted Price
export const formatedPrice = (number) =>
  Number(number.toFixed(1)).toLocaleString().replace(/,/g, ".");

// Export Number Star Ratings
export const numberStarRatings = (number) => {
  if (!Number(number)) return;

  const stars = [];
  for (let i = 0; i < +number; i++) stars.push(<AiFillStar color="orange" />);
  for (let i = 5; i > +number; i--)
    stars.push(<AiOutlineStar color="orange" />);
  return stars;
};
