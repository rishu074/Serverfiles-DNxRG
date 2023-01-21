function passwordGenerator(length: number) {
    const chars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789012345678901234567890123456789";

    const password = [...Array(length)].reduce((accumulator, _element) => {
        const randomIndex = Math.floor(Math.random() * chars.length);
        return accumulator + chars[randomIndex];
    }, "");
    return password;
}