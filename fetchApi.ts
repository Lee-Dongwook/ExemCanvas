export async function fetchApi() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        const data = await response.json()
        console.log(data)
        return data 
    }
    catch {
        console.error('Error fetching data: ', Error.name)
    }
}