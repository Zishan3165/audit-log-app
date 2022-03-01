import bcyrpt from 'bcrypt';

const SALT_ROUNDS = 10;

export const generatePassword = async (password) => {
  const hashedPassword = await bcyrpt.genSalt(SALT_ROUNDS, async function (saltError, salt) {
    if (saltError) {
      throw saltError;
    } else {
      await bcyrpt.hash(password, salt, function (hashError, hash) {
        if (hashError) {
          throw hashError;
        } else {
          return hash;
        }
      });
    }
  });
  return hashedPassword;
};
