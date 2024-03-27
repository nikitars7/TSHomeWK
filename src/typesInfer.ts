type Film = {
    name: string;
    year: string;
    rating: number;
    awards: string[];
};
type Category2 = {
    name: string;
    films: Film[];
};
interface MovieList {
    movies: Film[];
    filterState: FilterState;
    applySearchValue: (searchValue: keyof Film) => void;
    applyFiltersValue: (filters: (RangeFilter | ValuesFilter)[]) => void;
}
export const filmsList: MovieList = {
    movies: [
        { name: 'Terminator', year: '1984', rating: 10, awards: ['some award', 'some award'] },
        { name: 'Interstellar', year: '2014', rating: 10, awards: ['some other award'] },
        { name: 'Oppenheimer', year: '2023', rating: 10, awards: ['Oscar'] },
    ],
    filterState: {
        filters: [
            { filter: 'name', type: 'match' },
            { filter: 3, filterTo: 10, type: 'range' },
            { values: ['some award'], type: 'values' },
        ],
    },
    applySearchValue(searchValue) {
        this.filterState.filters = this.filterState.filters.map(filter => {
            return filter.type === 'match' ? ({ ...filter, filter: searchValue } as MatchFilter) : filter;
        });
    },
    applyFiltersValue(filters) {
        this.filterState.filters = [
            this.filterState.filters.find(filter => filter.type === 'match') as MatchFilter,
            ...filters,
        ];
    },
};
// export const applySearchValue = (filterState: FilterState, searchValue: string): FilterState => {
//     const changedSearchValue = filterState.filters.map(filter => {
//         return filter.type === 'match' ? ({ ...filter, filter: searchValue } as MatchFilter) : filter;
//     });
//     return { filters: [...changedSearchValue] };
// };
const categoriesList: Category2[] = [
    {
        name: 'Science-fiction',
        films: [
            { name: 'Interstellar', year: '2014', rating: 10, awards: ['some other award'] },
            { name: 'Terminator', year: '1984', rating: 10, awards: ['some award', 'some award'] },
        ],
    },
    { name: 'historic', films: [{ name: 'Oppenheimer', year: '2023', rating: 10, awards: ['Oscar'] }] },
    { name: 'Fantasy', films: [] },
];

const findFilmByName = (films: Film[], name: string): Film | undefined => {
    return films.find(film => film.name.toLowerCase() === name.toLowerCase());
};
const findCategoryByName = (categories: Category2[], name: string): Category2 | undefined => {
    return categories.find(category => category.name.toLowerCase() === name.toLowerCase());
};

export const findFilmByQuery = (films: Film[], args: string | number | string[]): Film[] => {
    if (typeof args === 'string') {
        return films.filter(film => film.year === args);
    } else if (typeof args === 'number') {
        return films.filter(film => film.rating === args);
    } else {
        return films.filter(film => {
            return args.every(award => film.awards.includes(award));
        });
    }
};

type MatchFilter = {
    type: 'match';
    filter: string;
};
type RangeFilter = {
    type: 'range';
    filter: number;
    filterTo: number;
};
type ValuesFilter = {
    type: 'values';
    values: string[];
};

type FilterState = {
    filters: (MatchFilter | RangeFilter | ValuesFilter)[];
};

// class Example

class Movie {
    constructor(public title: string, public releaseYear: number, public rating: number, public awards: string[]) {}
    static filterMovieByTitle(movies: Movie[], title: string): Movie | undefined {
        return movies.find(movie => movie.title.toLowerCase() === title.toLowerCase());
    }
    static filterMoviesByParams(movies: Movie[], releaseYear: number): Movie[] | undefined;
    static filterMoviesByParams(movies: Movie[], rating: number): Movie[] | undefined;
    static filterMoviesByParams(movies: Movie[], awards: string[]): Movie[] | undefined;
    static filterMoviesByParams(movies: Movie[], args: number | string[]): Movie[] | undefined {
        if (typeof args === 'number' && args <= 10) {
            return movies.filter(movie => movie.rating === args);
        } else if (typeof args === 'number' && args > 10) {
            return movies.filter(movie => movie.releaseYear === args);
        } else if (typeof args === 'object') {
            return movies.filter(movie => {
                return args.every(award => movie.awards.includes(award));
            });
        }
    }
}

class Category {
    constructor(public name: string, public movies: Movie[]) {}
    static findCategoryByName(categories: Category[], name: string): Category | undefined {
        return categories.find(category => category.name.toLowerCase() === name.toLowerCase());
    }
}
// { name: 'Terminator', year: '1984', rating: 10, awards: ['some award', 'some award'] },
// { name: 'Interstellar', year: '2014', rating: 10, awards: ['some other award'] },
// { name: 'Oppenheimer', year: '2023', rating: 10, awards: ['Oscar'] },
const movie = new Movie('Terminator', 1984, 10, ['some award', 'some award']);
const movies: Movie[] = [movie];
console.log(Movie.filterMovieByTitle(movies, 'Terminator'));
console.log(Movie.filterMoviesByParams(movies, 1984));
console.log(Movie.filterMoviesByParams(movies, 10));
console.log(Movie.filterMoviesByParams(movies, ['some award', 'some award']));

class MovieListClass {
    constructor(public movies: Movie[], public filterState: FilterState) {}
    applySearchValue(searchValue: keyof Movie): void {
        this.filterState.filters = this.filterState.filters.map(filter => {
            return filter.type === 'match' ? ({ ...filter, filter: searchValue } as MatchFilter) : filter;
        });
    }
    applyFiltersValue(filters: FilterState): void {}
}

class CategoryListClass {
    constructor(public categories: Category[], public filterState: FilterState) {}
    applySearchValue(searchValue: keyof Movie): void {}
    applyFiltersValue(filters: FilterState): void {}
}

const movieListClassInstance = new MovieListClass(movies, {
    filters: [
        { filter: 'title', type: 'match' },
        { values: ['some award'], type: 'values' },
    ],
});
movieListClassInstance.applySearchValue('releaseYear');
console.log(movieListClassInstance);
