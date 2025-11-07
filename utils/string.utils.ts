export const StringToTitle = (title: string) => {
    return title.toLowerCase().split(" ").map(word => {
        if (word.length === 0) return "";
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(" ");
};
