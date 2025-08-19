const secretKey = "some-simple-key";

export function encrypt(text: string) {
  return btoa(
    [...text]
      .map((char, i) =>
        String.fromCharCode(
          char.charCodeAt(0) ^ secretKey.charCodeAt(i % secretKey.length),
        ),
      )
      .join(""),
  );
}

export function decrypt(encoded: string) {
  const encrypted = atob(encoded);
  return [...encrypted]
    .map((char, i) =>
      String.fromCharCode(
        char.charCodeAt(0) ^ secretKey.charCodeAt(i % secretKey.length),
      ),
    )
    .join("");
}
