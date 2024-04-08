import italian_language from "./italian";
import english_language from "./english";

interface Labels{
    [key: string]: string
}
  
interface AllLanguages{
    [key: string]: Labels
}
  
const languages: AllLanguages = {
    ita: italian_language,
    eng: english_language
}

export default languages;