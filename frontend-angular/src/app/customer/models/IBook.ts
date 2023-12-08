
export interface IBook {
    id: number,
    title: string;
    author: string;
    genre: string;
    description: string;
    isbn: string;
    published_date: string;
    publisher: string;
}

export interface IBasePaginationResponse {
    data: any[],
    links: {
        first: string,
        last: string,
        prev: string,
        next: string
    },
    meta: {
        current_page: number,
        from: number,
        last_page: number,
        links: {
            url: string,
            label: string,
            active: boolean
        }[],
        path: string,
        per_page: number,
        to: number,
        total: number
    }
}

export interface IBookResponse extends IBasePaginationResponse {
    data: IBook[],
}
