import { extractInputVariableTokensFromQuerySql } from './extractInputVariableTokensFromQuerySql';

describe('extractInputVariableTokensFromQuerySql', () => {
  it('should find tokens inside where clause', () => {
    const sql = `
select
  i.url
from image i
where id = :id
    `.trim();
    const tokens = extractInputVariableTokensFromQuerySql({ sql });
    expect(tokens).toEqual([':id']);
  });
  it('should not confuse a hardcoded time with tokens', () => {
    const sql = `
select
  i.url
from image i
where s.created_at > '2020-01-01 05:55:55';
    `;
    const tokens = extractInputVariableTokensFromQuerySql({ sql });
    expect(tokens).toEqual([]);
  });
  it('should find tokens inside of a function on one line', () => {
    const sql = `
SELECT get_cool_stuff_from_db(:name, :plane);
    `.trim();
    const tokens = extractInputVariableTokensFromQuerySql({ sql });
    expect(tokens).toEqual([':name', ':plane']);
  });
  it('should find tokens inside of a function on multiple lines', () => {
    const sql = `
SELECT upsert_plane(
  :model,
  :ownerId,
  :pin,
);
    `.trim();
    const tokens = extractInputVariableTokensFromQuerySql({ sql });
    expect(tokens).toEqual([':model', ':ownerId', ':pin']);
  });
});
