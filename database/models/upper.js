function upper(string) {
  const stringSplit = string.split(" ");
  let cont = 0;
  for (i of stringSplit) {
    stringSplit[cont] = i.replace(i[0], i[0].toUpperCase());
    cont++;
  }
  const stringUpper = stringSplit.join(" ");

  return stringUpper;
}

module.exports = upper
