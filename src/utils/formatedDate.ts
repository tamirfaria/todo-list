export const formatedDate = (date: string) => {
  const dateToArray = date.split("-");
  return `${dateToArray[2]}/${dateToArray[1]}/${dateToArray[0]}`;
};
