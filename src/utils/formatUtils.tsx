export const shortText = (text: String) => {
    if(text.length > 20) {
        return `${text.substring(0, 15)}...`
    }
    return text
}