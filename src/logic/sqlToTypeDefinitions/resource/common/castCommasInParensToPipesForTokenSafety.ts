export const castCommasInParensToPipesForTokenSafety = ({ sql }: { sql: string }) => {
  // track state of whether we are in parenthesizes or not
  let areInsideParensDepth = 0; // init as 0, since not inside parens
  const areInsideParens = () => areInsideParensDepth > 0; // whenever areInsideParensDepth > 0, we are inside parens

  // init object to build up the "casted" string
  let castedString = '';

  // loop through each char and update state / replace char as needed
  [...sql].forEach((char) => {
    // 1. manage "areInsideParens" state
    if (char === '(') {
      areInsideParensDepth += 1; // one parens deeper!
    }
    if (char === ')') {
      if (!areInsideParens) throw new Error('exiting parenthesizes without having opened them; not supported'); // fail fast for unsupported case
      areInsideParensDepth -= 1; // mark that we've dropped off one parens now
    }

    // 2. cast the char, considering whether we're in parens or not
    const castedChar = areInsideParens() && char === ',' ? '|' : char; // cast "," if we are inside parens

    // 3. add casted char to string
    castedString += castedChar;
  });

  // return the casted string
  return castedString;
};
