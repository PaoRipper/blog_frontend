export const shortText = (text: String) => {
    if(text.length > 26) {
        return `${text.substring(0, 23)}...`
    }
    return text
}