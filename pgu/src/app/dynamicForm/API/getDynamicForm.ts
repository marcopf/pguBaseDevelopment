export default async function getDynamicForm(url: string){
    const res = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.ok){
        try{
            let parsedRes = await res.json();
            return parsedRes;
        }catch(e){
            console.log(e)
        }
    }else{
        return [];
    }
}
