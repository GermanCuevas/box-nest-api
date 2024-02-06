export const deliveryCodeGenerator = () => {
  let deliveryCode = '#';
  const characters = '0123456789';
  for (let i = 0; i < 4; i++) {
    deliveryCode += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return deliveryCode;
};
