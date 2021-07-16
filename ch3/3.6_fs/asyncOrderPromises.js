async function main() {
  let result = await fs.readFile("./readme.txt");
  console.log("1번", result.toString());
  result = await fs.readFile("./readme.txt");
  console.log("2번", result.toString());
  result = await fs.readFile("./readme.txt");
  console.log("3번", result.toString());
  result = await fs.readFile("./readme.txt");
  console.log("4번", result.toString());
}
main();