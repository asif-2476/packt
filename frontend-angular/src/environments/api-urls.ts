export default (baseUrl = 'http://localhost:8000') => {
    const admin = '/api/admin';
    return {
        getBooks: `${baseUrl}/api/books`,
        getBookDetails : `${baseUrl}/api/book`,
        admin: {
            getBooks: `${baseUrl}${admin}/books`,
            addAndUpdateBook: `${baseUrl}${admin}/book/add-update`,
            deleteBook: `${baseUrl}${admin}/book/delete`,
            login:`${baseUrl}${admin}/login`
        }
    }
}