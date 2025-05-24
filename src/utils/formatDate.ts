// Function for formatting date as DD/MM/YYYY
// export const formatDate = (dateString: string): string => {
//   const date = new Date(dateString);
//   return date.toLocaleString("en-GB", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   });
// };

// Function for formatting date as DD-MM-YYYY
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.toLocaleString("en-GB", { day: "2-digit" });
  const month = date.toLocaleString("en-GB", { month: "2-digit" });
  const year = date.toLocaleString("en-GB", { year: "numeric" });
  return `${day}-${month}-${year}`;
};

// Function for formatting date as DD/MM/YYYY HH:mm:ss AM/PM
export const formatDateWithTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};
