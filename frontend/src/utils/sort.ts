
export function sortByCreatedAt(data:any[]){
    console.log(typeof data)
    return data.sort((a,b) => (new Date(a.created_at)).getTime() - (new Date(b.created_at)).getTime())
}