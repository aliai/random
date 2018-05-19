export default (secRemaining) => {
  if (secRemaining > 10) return 'green';
  if (secRemaining > 8) return 'yellowgreen';
  if (secRemaining > 5) return 'yellow';
  if (secRemaining > 1.5) return 'redyellow';
  return 'red';
};
