export const castCommasInParensToPipesForTokenSafety = ({ sql }: { sql: string }) => {
  // track state of whether we are in parenthesizes or not
  let areInsideParens = false; // init as false, since havent entered yet

  // init object to build up the "casted" string
  let castedString = '';

  // loop through each char and update state / replace char as needed
  [...sql].forEach((char) => {
    // 1. manage "areInsideParens" state
    if (char === '(') {
      if (areInsideParens) throw new Error('nested parenthesizes found; not supported'); // fail fast for unsupported case
      areInsideParens = true; // mark that we are in parenthesizes now
    }
    if (char === ')') {
      if (!areInsideParens) throw new Error('exiting parenthesizes without having opened them; not supported'); // fail fast for unsupported case
      areInsideParens = false; // mark that we've left the parenthesizes now
    }

    // 2. cast the char, considering whether we're in parens or not
    const castedChar = areInsideParens && char === ',' ? '|' : char; // cast "," if we are inside parens

    // 3. add casted char to string
    castedString += castedChar;
  });

  // return the casted string
  return castedString;
};
