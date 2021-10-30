export default function removeTags(text){
    const regex = /(<([^>]+)>)/ig;
    const result = text.replace(regex, '');
    return result
}