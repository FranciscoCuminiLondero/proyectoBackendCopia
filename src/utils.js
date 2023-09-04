function generateUniqueId() {
    const timestamp = new Date().getTime();
    const randomValue = Math.floor(Math.random() * 10000);
    return `${timestamp}${randomValue}`;
}

module.exports = { generateUniqueId };