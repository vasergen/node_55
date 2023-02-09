async function main() {
  const { nanoid } = await import("nanoid"); // NOTE: import returns Promise need to await
  console.log("nanoid: ", nanoid());
}
main();
