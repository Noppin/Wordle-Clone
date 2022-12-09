
export const fetchWords = async ()=>{
    try {
        let result;
        const res = await fetch("./words.txt");
        const data = await res.text();
        result = data.split('\n');
        return result;
    } catch (error) {
        console.log(error);
    }
};