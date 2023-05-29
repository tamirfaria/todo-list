export const formatedDate = (date: Date) => {
  const dateToString = String(date).split("T")[0];
  const dateToArray = dateToString.split("-");
  return `${dateToArray[2]}/${dateToArray[1]}/${dateToArray[0]}`;
};
